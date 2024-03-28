export function notEmpty(value: unknown): string | void {
  if (typeof value === "string" && value.trim() === "")
    return "This field cannot be empty";

  if (value === "") return "This field cannot be empty";
}
