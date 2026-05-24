import { motion } from "framer-motion";
import { Linkedin, Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/send-contact";
import { openJerryChat } from "./JerryChatbot";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);

    const formData = new FormData(form);
    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      question: String(formData.get("question") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const result = await sendContactMessage({ data });

      if (result.success) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-border p-8 backdrop-blur sm:p-12 md:p-16"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-secondary" />
                Get in touch
              </div>

              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                <span className="text-gradient">Let's build something</span>
                <br />
                <span className="text-gradient-primary">
                  impactful together.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Open to internships, collaborations, and conversations on AI,
                full stack engineering, and design-led products.
              </p>

              <button
                type="button"
                onClick={openJerryChat}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/15"
              >
                Have a quick question? Ask Jerry →
              </button>

              <div className="mt-8 space-y-3">
                <a
                  href="mailto:aditinigam225@gmail.com"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm transition hover:border-primary/50 hover:bg-white/[0.06]"
                >
                  <Mail className="h-4 w-4 text-secondary" />
                  aditinigam225@gmail.com
                </a>

                <a
                  href="https://linkedin.com/in/aditi-nigam-001b8431a"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm transition hover:border-primary/50 hover:bg-white/[0.06]"
                >
                  <Linkedin className="h-4 w-4 text-secondary" />
                  linkedin.com/in/aditi-nigam
                </a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <Field
                label="Name"
                name="name"
                placeholder="Your name"
                required
              />

              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@domain.com"
                required
              />

              <Field
                label="Your question"
                name="question"
                placeholder="e.g. Internship opportunity, collaboration idea…"
                required
              />

              <Field
                label="Message"
                name="message"
                placeholder="Tell me a little about what you're building…"
                required
                textarea
              />

              <button
                type="submit"
                disabled={sending}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[0_15px_50px_-15px_var(--primary)] transition-all hover:scale-[1.01] disabled:opacity-60"
              >
                <Send className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <div>
            © {new Date().getFullYear()} Aditi Nigam · All rights reserved.
          </div>
          <div className="font-display tracking-widest">ADITI · NIGAM</div>
        </footer>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary/60 focus:bg-white/[0.06]";

  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>

      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={cls}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={cls}
        />
      )}
    </label>
  );
}
