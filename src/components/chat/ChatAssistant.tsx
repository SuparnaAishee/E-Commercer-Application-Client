"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";

type ChatProduct = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  shop?: string;
  category?: string;
  isFlashSale: boolean;
  discount_percentage: number | null;
};

type ChatTurn =
  | { id: string; role: "user"; text: string }
  | {
      id: string;
      role: "assistant";
      text: string;
      products?: ChatProduct[];
      suggestions?: string[];
    }
  | { id: string; role: "system"; text: string };

const WELCOME: ChatTurn = {
  id: "welcome",
  role: "assistant",
  text: "Hi! I can help you find products, suggest gifts, or answer questions about Dokan Express. What are you shopping for today?",
  suggestions: [
    "Show me wireless headphones",
    "Recommend gifts for a coffee lover",
    "Where's my recent order?",
  ],
};

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1/"
).replace(/\/+$/, "");

const ChatAssistant = () => {
  const { chatOpen, setChatOpen } = useUser();
  const open = chatOpen;
  const setOpen = setChatOpen;
  const [turns, setTurns] = useState<ChatTurn[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [open, turns]);

  const sendMessage = async (raw: string) => {
    const message = raw.trim();
    if (!message || busy) return;

    setBusy(true);
    setInput("");
    const userTurn: ChatTurn = {
      id: `${Date.now()}-u`,
      role: "user",
      text: message,
    };
    setTurns((prev) => [...prev, userTurn]);

    try {
      const res = await fetch(`${apiBaseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const json: {
        success?: boolean;
        message?: string;
        data?: {
          reply: string;
          intent: string;
          products: ChatProduct[];
          suggestions: string[];
        };
      } = await res.json();

      if (!res.ok || !json?.success || !json.data) {
        throw new Error(json?.message || `Chat failed (${res.status})`);
      }

      setTurns((prev) => [
        ...prev,
        {
          id: `${Date.now()}-a`,
          role: "assistant",
          text: json.data!.reply,
          products: json.data!.products,
          suggestions: json.data!.suggestions,
        },
      ]);
    } catch (err) {
      setTurns((prev) => [
        ...prev,
        {
          id: `${Date.now()}-e`,
          role: "system",
          text:
            err instanceof Error
              ? `Couldn't reach the assistant: ${err.message}`
              : "Couldn't reach the assistant.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg shadow-orange-600/30 w-14 h-14 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[92vw] h-[560px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            <header className="bg-gradient-to-r from-orange-600 to-amber-500 text-white px-4 py-3 flex items-center gap-2">
              <Sparkles size={18} />
              <div className="flex-1">
                <div className="font-semibold leading-tight">Shopping Assistant</div>
                <div className="text-xs opacity-90">Powered by Gemini</div>
              </div>
            </header>

            <div
              ref={threadRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50"
            >
              {turns.map((turn) => (
                <ChatBubble key={turn.id} turn={turn} onSuggestion={sendMessage} />
              ))}
              {busy && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  Thinking…
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="border-t border-gray-100 px-3 py-3 flex items-center gap-2 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-400 text-sm"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg p-2"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

type ChatBubbleProps = {
  turn: ChatTurn;
  onSuggestion: (text: string) => void;
};

const ChatBubble = ({ turn, onSuggestion }: ChatBubbleProps) => {
  if (turn.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-orange-600 text-white rounded-2xl rounded-tr-sm px-3 py-2 text-sm max-w-[80%] whitespace-pre-wrap">
          {turn.text}
        </div>
      </div>
    );
  }

  if (turn.role === "system") {
    return (
      <div className="text-xs text-red-600 bg-red-50 rounded-md px-3 py-2">
        {turn.text}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-start">
        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-gray-800 max-w-[88%] whitespace-pre-wrap shadow-sm">
          {turn.text}
        </div>
      </div>

      {turn.products && turn.products.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {turn.products.map((product) => (
            <ChatProductMiniCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {turn.suggestions && turn.suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {turn.suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSuggestion(suggestion)}
              className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-full px-3 py-1 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ChatProductMiniCard = ({ product }: { product: ChatProduct }) => {
  const discount =
    product.isFlashSale && product.discount_percentage
      ? Math.round(product.discount_percentage)
      : 0;
  const finalPrice =
    discount > 0 ? product.price * (1 - discount / 100) : product.price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="flex gap-3 bg-white border border-gray-100 rounded-xl p-2 hover:border-orange-300 hover:shadow-sm transition"
    >
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </div>
        <div className="text-xs text-gray-500">
          {product.category}
          {product.shop ? ` · ${product.shop}` : ""}
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-gray-900">
            ${finalPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[10px] font-semibold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatAssistant;
