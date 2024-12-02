import {
  BarChart3,
  Database,
  Eye,
  Lock,
  MessagesSquare,
  Table,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    title: "Natural Language Query",
    description: "Chat with your database using simple, natural language.",
    icon: <MessagesSquare className="size-4 md:size-6" />,
  },
  {
    title: "Database Visualizer",
    description: "Visualize your database architecture and connections.",
    icon: <Database className="size-4 md:size-6" />,
  },
  {
    title: "Smart Table View",
    description:
      "Sort and filter data with modes for technical and non-technical users.",
    icon: <Table className="size-4 md:size-6" />,
  },
  {
    title: "Customizable Context",
    description: "Limit the chatbot's access to specific tables and schemas.",
    icon: <Eye className="size-4 md:size-6" />,
  },
  {
    title: "Views (Coming Soon)",
    description:
      "Save queries and generate custom views as tables, cards, or graphs.",
    icon: <BarChart3 className="size-4 md:size-6" />,
  },
  {
    title: "Secure Connection",
    description:
      "Your database connection string is encrypted and inaccessible to us.",
    icon: <Lock className="size-4 md:size-6" />,
  },
];

export function Features() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      <div className="mb-10 md:mb-20">
        <h2 className="text-center text-3xl font-semibold lg:text-5xl">
          Core Features
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-white transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
