import {
  mutationGeneric,
  Query,
  queryGeneric,
  QueryInitializer,
} from "convex/server";
import { v } from "convex/values";
import { DataModel, Id, Doc } from "./_generated/dataModel";

export const get = queryGeneric({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const documents = await context.db.query("documents").collect();
    return documents;
  },
});

export const create = mutationGeneric({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const document = await context.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const getSidebar = queryGeneric({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const tableQuery: QueryInitializer<DataModel["documents"]> =
      context.db.query("documents");

    const documents = await tableQuery
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const archive = mutationGeneric({
  args: { id: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument: Doc<"documents"> | null = await context.db.get(
      args.id
    );

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }
    const tableQuery: QueryInitializer<DataModel["documents"]> =
      context.db.query("documents");

    // Recursively archive all children of the document
    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await tableQuery
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await context.db.patch(child._id, {
          isArchived: true,
        });
        await recursiveArchive(child._id);
      }
    };

    const document = await context.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return document;
  },
});

export const getTrash = queryGeneric({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await context.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

export const restore = mutationGeneric({
  args: { id: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const tableQuery: QueryInitializer<DataModel["documents"]> =
      context.db.query("documents");

    // Recursively restore all children of the document
    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await tableQuery
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await context.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existingDocument.parentDocument) {
      const parent = await context.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const document = await context.db.patch(args.id, options);

    recursiveRestore(args.id);

    return document;
  },
});

export const remove = mutationGeneric({
  args: { id: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await context.db.delete(args.id);

    return document;
  },
});

export const getSearch = queryGeneric({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await context.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getById = queryGeneric({
  args: { documentId: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    const document = await context.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return document;
  },
});

export const update = mutationGeneric({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await context.db.patch(args.id, {
      ...rest,
    });

    return document;
  },
});
