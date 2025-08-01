import {
  mutationGeneric,
  Query,
  queryGeneric,
  QueryInitializer,
} from "convex/server";
import { v } from "convex/values";
import { DataModel } from "./_generated/dataModel";

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

    let indexedQuery: Query<DataModel["documents"]> = tableQuery;

    indexedQuery = tableQuery.withIndex("by_user_parent", (q) =>
      q.eq("userId", userId)
    );

    if (args.parentDocument !== undefined) {
      indexedQuery = tableQuery.withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      );
    }

    const documents = await indexedQuery
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});
