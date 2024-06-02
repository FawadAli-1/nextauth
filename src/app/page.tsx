import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-6">
        <h1 className="font-bold text-3xl">NextJS Authentication</h1>
        <p>
          This app is all about NextJS and authentication for the sake of
          learning.
        </p>
        <p>
          Current page: <span className="font-semibold">Main Page</span>
        </p>
        <div className="flex gap-4">
          <Link href={"/login"} className={cn(buttonVariants())}>
            Login
          </Link>
          <Link href={"/signup"} className={cn(buttonVariants())}>
            Signup
          </Link>
          <Link href={"/profile"} className={cn(buttonVariants())}>
            Profile
          </Link>
        </div>
      </div>
    </section>
  );
}
