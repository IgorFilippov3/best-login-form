import type { ZodError } from "zod";

export function extractZodErrors<T extends Record<string, string>>(
  zodError: ZodError
): Partial<Record<keyof T, string>> {
  return zodError.issues.reduce((acc, issue) => {
    const field = issue.path[0] as keyof T;
    if (field && !acc[field]) {
      acc[field] = issue.message;
    }
    return acc;
  }, {} as Partial<Record<keyof T, string>>);
}
