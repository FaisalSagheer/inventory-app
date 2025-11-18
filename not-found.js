import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl py-20">404 - Page Not Found</h1>
      <Button variant={"destructive"}>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
