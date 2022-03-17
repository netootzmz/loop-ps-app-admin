export type langs = "es" | "en";

export interface iErrorsMessages {
  (message: string, code?: string): string;
}
