import clsx from "clsx";

type SkeletonProps = {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
};

const roundedMap: Record<NonNullable<SkeletonProps["rounded"]>, string> = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export const Skeleton = ({ className, rounded = "md" }: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={clsx(
      "relative overflow-hidden bg-gray-100/80 ring-1 ring-gray-100",
      roundedMap[rounded],
      "before:absolute before:inset-0 before:-translate-x-full",
      "before:animate-[shimmer_1.6s_infinite]",
      "before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent",
      className,
    )}
  />
);

export default Skeleton;
