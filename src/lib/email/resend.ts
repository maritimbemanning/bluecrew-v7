import { Resend } from "resend";

// Lazy initialization to prevent build-time errors
let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

// Proxy for backwards compatibility
export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    return getResend()[prop as keyof Resend];
  },
});

// Email addresses from environment
// Always use "Bluecrew" as display name for better inbox appearance
const rawFromEmail = process.env.RESEND_FROM_EMAIL || "no-reply@send.bluecrew.no";
export const FROM_EMAIL = rawFromEmail.includes("<") 
  ? rawFromEmail // Already has display name
  : `Bluecrew <${rawFromEmail}>`; // Add display name
export const TO_EMAILS = process.env.RESEND_TO_EMAILS
  ? process.env.RESEND_TO_EMAILS.split(",")
  : ["isak@bluecrew.no", "tf@bluecrew.no", "post@bluecrew.no"];
