import { ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import AnimatedGradientText from "../magic-ui/animated-gradient-text";
import SparklesText from "../magic-ui/sparkles-text";
import { BackgroundLines } from "../aceternity-ui/background-lines";

export const Hero = () => {
  return (
    <BackgroundLines>
      <section className="w-full py-24 px-6 md:px-12 lg:px-24">
        <div className="container text-center">
          <div className="z-10 flex min-h-28 items-center justify-center">
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Introducing APB
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </div>
          <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-6xl">
              Simplify Your Database Management
            </h1>
            <p className="text-balance text-muted-foreground lg:text-lg">
              Connect, visualize, and interact with your Postgres database
              effortlessly. Create powerful admin panels in minutes.
            </p>
            <SparklesText
              text="Built for both Techies & Non-Techies"
              className="text-lg mb-8 font-semibold"
            />
            <div>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow pointer-events-auto z-10"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className={cn(buttonVariants({}), "group z-10")}
                >
                  Join Waitlist
                  <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
              <p className="mt-4 text-sm text-muted-foreground">
                Be the first to know when we launch!
              </p>
            </div>
          </div>
        </div>
      </section>
    </BackgroundLines>
  );
};
