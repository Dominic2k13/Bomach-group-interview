type ClassValue = string | boolean | undefined | null | Record<string, boolean>;

/** Merges Tailwind class names, filtering out falsy values. Supports object syntax. */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flatMap((cls) => {
      if (!cls) return [];
      if (typeof cls === "object") {
        return Object.entries(cls)
          .filter(([, v]) => v)
          .map(([k]) => k);
      }
      return [cls];
    })
    .filter(Boolean)
    .join(" ");
}
