import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { jerryIntro, jerrySuggestions } from "@/data/jerry-knowledge";
import { chatWithJerry } from "@/lib/jerry-chat";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatChatError(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
}

export function JerryChatbot() {
  const chatFn = useServerFn(chatWithJerry);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "intro", role: "assistant", text: jerryIntro },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("jerry:open", onOpen);
    return () => window.removeEventListener("jerry:open", onOpen);
  }, []);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      text: trimmed,
    };

    const history = [...messages, userMessage]
      .filter((m) => m.id !== "intro")
      .slice(-12)
      .map((m) => ({
        role: m.role,
        content: m.text,
      }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const result = await chatFn({
        data: {
          message: trimmed,
          history: history.slice(0, -1),
        },
      });

      const replyText =
        result.source === "local" && result.hint
          ? `${result.reply}\n\n— ${result.hint}`
          : result.reply;

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: replyText,
        },
      ]);
    } catch (error) {
      console.error("Jerry chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: `Sorry, I couldn't connect right now. ${formatChatError(error)}`,
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[min(520px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            role="dialog"
            aria-label="Jerry chatbot"
          >
            <header className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-white/[0.05]">
                  <Bot className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">Jerry</p>
                  <p className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Sparkles className="h-2.5 w-2.5 text-secondary" />
                    AI portfolio guide
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                        : "border border-border bg-white/[0.04] text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-border bg-white/[0.04] px-3.5 py-2.5 text-sm text-muted-foreground">
                    Jerry is thinking…
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border px-3 py-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {jerrySuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    disabled={typing}
                    className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[10px] text-muted-foreground transition hover:border-primary/40 hover:text-foreground disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Jerry anything…"
                  disabled={typing}
                  className="flex-1 rounded-xl border border-border bg-white/[0.03] px-3 py-2 text-sm outline-none transition focus:border-primary/50 disabled:opacity-60"
                  aria-label="Message for Jerry"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground transition hover:scale-105 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_15px_50px_-15px_var(--primary)]"
        aria-expanded={open}
        aria-label={open ? "Close Jerry chat" : "Chat with Jerry"}
      >
        {open ? (
          <X className="h-4 w-4" />
        ) : (
          <MessageCircle className="h-4 w-4" />
        )}
        Jerry
      </motion.button>
    </>
  );
}

export function openJerryChat() {
  window.dispatchEvent(new Event("jerry:open"));
}
