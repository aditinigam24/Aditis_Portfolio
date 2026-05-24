import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactInput = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  question: z.string().trim().min(1, "Please add your question"),
  message: z.string().trim().min(1, "Message is required"),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Normalize values pasted into Vercel (quotes, spaces in app passwords). */
function readEnv(name: string) {
  const raw = process.env[name];
  if (!raw) return undefined;
  const trimmed = raw.trim().replace(/^["']|["']$/g, "");
  return trimmed || undefined;
}

function getGmailCredentials() {
  const user = readEnv("EMAIL_USER");
  const passRaw = readEnv("EMAIL_PASS");
  const pass = passRaw?.replace(/\s+/g, "");

  if (!user || !pass) {
    throw new Error(
      "Email is not configured on the server. Add EMAIL_USER and EMAIL_PASS in Vercel → Settings → Environment Variables, then redeploy.",
    );
  }

  return { user, pass };
}

function toContactError(error: unknown): Error {
  const message = error instanceof Error ? error.message : String(error);

  if (
    message.includes("535") ||
    message.includes("BadCredentials") ||
    message.includes("Username and Password not accepted")
  ) {
    return new Error(
      "Gmail rejected the login. Use a Gmail App Password (not your normal password) in Vercel as EMAIL_PASS, then redeploy.",
    );
  }

  if (message.includes("EAUTH") || message.includes("Invalid login")) {
    return new Error(
      "Could not sign in to Gmail. Check EMAIL_USER and EMAIL_PASS on Vercel, then redeploy.",
    );
  }

  return error instanceof Error ? error : new Error(message);
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator(contactInput)
  .handler(async ({ data }) => {
    const { user, pass } = getGmailCredentials();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeQuestion = escapeHtml(data.question);
    const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br>");

    try {
      await transporter.sendMail({
        from: `"Portfolio" <${user}>`,
        to: user,
        replyTo: data.email,
        subject: `Portfolio: ${data.question} — from ${data.name}`,
        html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Question:</strong> ${safeQuestion}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
      });
    } catch (error) {
      console.error("[send-contact]", error);
      throw toContactError(error);
    }

    return { success: true as const, message: "Email sent successfully" };
  });
