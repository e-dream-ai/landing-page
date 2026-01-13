import { cn } from "@/lib/utils";

interface ContentBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentBox({ children, className }: ContentBoxProps) {
  return (
    <div
      className={cn(
        "bg-primary/10 border border-primary/30 font-medium rounded-lg p-5 font-secondary text-primary text-base hover:bg-primary/15 hover:border-primary/50 hover:-translate-y-1 hover:shadow-custom-cyan transform transition-all duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </div>
  );
}
