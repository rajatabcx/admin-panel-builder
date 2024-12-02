import { CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description: "Create your account in just a few clicks.",
  },
  {
    title: "Create a Project",
    description:
      "Name your project, add a description, and enter your database connection URL.",
  },
  {
    title: "You're All Set!",
    description:
      "We'll create everything based on your input. Start exploring and managing your database right away.",
  },
];

export function HowToUse() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      <div className="mb-10 md:mb-20">
        <h2 className="text-center text-3xl font-semibold lg:text-5xl">
          How to Use
        </h2>
      </div>
      <div className="max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start mb-8">
            <div className="flex-shrink-0 mr-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{`${index + 1}. ${
                step.title
              }`}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
