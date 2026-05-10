"use client";

import { useGetAllProducts } from "@/src/hooks/product";
import { Search as SearchIcon, X, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const RECENT_KEY = "dx-recent-searches";
const MAX_RECENT = 5;

const useDebounced = <T,>(value: T, delay: number) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

const readRecent = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const writeRecent = (q: string) => {
  if (typeof window === "undefined" || !q.trim()) return;
  const next = [q, ...readRecent().filter((s) => s !== q)].slice(0, MAX_RECENT);
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
};

type Props = { className?: string; placeholder?: string };

const Search = ({
  className = "",
  placeholder = "Search products, shops, categories…",
}: Props) => {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const debouncedTerm = useDebounced(term.trim(), 250);
  const enabled = debouncedTerm.length >= 2;

  const { data, isFetching } = useGetAllProducts(
    enabled ? [{ name: "searchTerm", value: debouncedTerm }, { name: "limit", value: 6 }] : [],
  );
  const suggestions = useMemo(
    () => (enabled ? (data?.data ?? []).slice(0, 6) : []),
    [data, enabled],
  );

  useEffect(() => setRecent(readRecent()), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submitTo = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      writeRecent(trimmed);
      setRecent(readRecent());
      setOpen(false);
      router.push(`/products?searchTerm=${encodeURIComponent(trimmed)}`);
    },
    [router],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        const product = suggestions[activeIndex];
        setOpen(false);
        setTerm("");
        router.push(`/products/${product.id}`);
        return;
      }
      submitTo(term);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    }
  };

  const showRecent = !enabled && recent.length > 0;
  const showResults = enabled;
  const isOpen = open && (showRecent || showResults);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded-full bg-gray-50 ring-1 ring-gray-200 focus-within:ring-orange-300 focus-within:bg-white transition-all">
        <span className="pl-4 text-gray-400">
          <SearchIcon size={16} />
        </span>
        <input
          type="text"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setActiveIndex(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
        />
        {term && (
          <button
            type="button"
            onClick={() => {
              setTerm("");
              setActiveIndex(-1);
            }}
            aria-label="Clear search"
            className="text-gray-400 hover:text-gray-600 pr-2"
          >
            <X size={14} />
          </button>
        )}
        <button
          type="button"
          onClick={() => submitTo(term)}
          className="bg-gray-900 hover:bg-orange-500 text-white text-xs font-medium px-4 py-2 rounded-full mr-1 transition-colors"
        >
          Search
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] ring-1 ring-gray-100 overflow-hidden">
          {showRecent && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Recent
                </p>
                <button
                  type="button"
                  onClick={() => {
                    window.localStorage.removeItem(RECENT_KEY);
                    setRecent([]);
                  }}
                  className="text-[11px] text-gray-400 hover:text-orange-500"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => submitTo(r)}
                    className="inline-flex items-center gap-1.5 text-xs bg-gray-50 hover:bg-orange-50 hover:text-orange-700 text-gray-700 rounded-full px-3 py-1 ring-1 ring-gray-100 transition"
                  >
                    <Clock size={11} className="text-gray-400" />
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showResults && (
            <div className="max-h-[60vh] overflow-y-auto">
              {isFetching && suggestions.length === 0 && (
                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                  Searching…
                </div>
              )}
              {!isFetching && suggestions.length === 0 && (
                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                  No matches for &ldquo;{debouncedTerm}&rdquo;
                </div>
              )}
              {suggestions.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => {
                    writeRecent(debouncedTerm);
                    setOpen(false);
                    setTerm("");
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex items-center gap-3 px-3 py-2.5 transition ${
                    activeIndex === i ? "bg-orange-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.category?.name ?? ""}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                </Link>
              ))}
              {suggestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => submitTo(debouncedTerm)}
                  className="w-full text-center text-xs font-medium text-orange-600 hover:bg-orange-50 py-3 border-t border-gray-100 transition"
                >
                  See all results for &ldquo;{debouncedTerm}&rdquo;
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
