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

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator(contactInput)
  .handler(async ({ data }) => {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      throw new Error(
        "Email is not configured. Set EMAIL_USER and EMAIL_PASS in your .env file.",
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeQuestion = escapeHtml(data.question);
    const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br>");

    await transporter.sendMail({
      from: user,
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

    return { success: true as const, message: "Email sent successfully" };
  });
