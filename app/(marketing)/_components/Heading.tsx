"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";

import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import { Typewriter } from "react-simple-typewriter";

export default function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-5xl space-y-6">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-20">
        Your Workspace for <br />
        <Typewriter
          words={["Thinking", "Writing", "Planning"]}
          loop={0} // 0 = infinite
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={60}
          delaySpeed={1000}
        />{" "}
        <br />
        <span className="underline">NoteVault</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        NoteVault brings your work together <br /> better, faster, smarter.
      </h3>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter NoteVault
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get NoteVault Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
