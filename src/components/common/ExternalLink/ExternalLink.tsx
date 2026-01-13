import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "underline hover:text-cyan-500 transition-all duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </Link>
  );
}
