import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32">
      <p className="text-sm text-t3">404</p>
      <h1 className="mt-2 text-4xl font-[350] tracking-[-0.045em] sm:text-5xl">This page doesn’t exist.</h1>
      <p className="mt-4 text-t3">It may have moved, or the link is wrong.</p>
      <Button asChild className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
