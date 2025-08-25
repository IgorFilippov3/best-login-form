const errorMap: Record<string, string> = {
  "User not found": "We could not find an account with that email address.",
  "Invalid password": "The password you entered is incorrect.",
  "Network error":
    "Unable to connect to our servers. Please check your internet connection and try again.",
  "Too many requests":
    "Too many login attempts. Please wait a few minutes before trying again.",
  "Server error":
    "Our servers are experiencing issues. Please try again in a few minutes.",
};

export function formatApiError(error: unknown): string {
  switch (typeof error) {
    case "string":
      return errorMap[error] || error;
    default:
      return "An unexpected error occurred. Please try again.";
  }
}
