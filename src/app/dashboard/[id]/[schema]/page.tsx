import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string; schema: string }>;
}) {
  const { id, schema } = await params;
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center">
      <Card className="rounded-lg w-full max-w-xl bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-5">Schema</CardTitle>
          <CardDescription className="text-muted-foreground">
            Select database or a table from the navigation panel on the left to
            view its data, or create a new one.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href={`/dashboard/${id}/${schema}/database`}
            className={cn(buttonVariants({}))}
          >
            View Database
            <ChevronRight className="size-4" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
