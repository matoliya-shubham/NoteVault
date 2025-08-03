import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Vault } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteVault",
  description: "Your Workspace for Thinking, Writing & Planning.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        href: "/logo.svg",
        url: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        href: "/logo-dark.svg",
        url: "/logo-dark.svg",
      },
    ],
  },
  openGraph: {
    title: "NoteVault – Your connected workspace",
    description: "Write, plan, and organize your work in one place.",
    url: "https://note-vault-gules.vercel.app/",
    siteName: "NoteVault",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoteVault Preview Image",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="note-vault"
            >
              <Toaster position="bottom-center" richColors />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
