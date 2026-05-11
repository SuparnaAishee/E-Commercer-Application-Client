"use client";

import { useForgotPassword } from "@/src/hooks/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Copy,
  ExternalLink,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

type Result = {
  email: string;
  resetLink: string;
  emailSent: boolean;
  expiresIn?: string;
};

const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const router = useRouter();
  const { handleSubmit, register, formState } = useForm<{ email: string }>();
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const submit: SubmitHandler<{ email: string }> = (data) => {
    forgotPassword(data, {
      onSuccess(resp) {
        if (resp?.success) {
          setResult(resp.data as Result);
          toast.success(
            (resp.data as Result)?.emailSent
              ? "Email sent. Check your inbox."
              : "Reset link ready below.",
          );
        } else {
          toast.error(resp?.message ?? "Could not send reset link");
        }
      },
      onError(error) {
        toast.error(error?.message ?? "Network error");
      },
    });
  };

  const copyLink = async () => {
    if (!result?.resetLink) return;
    try {
      await navigator.clipboard.writeText(result.resetLink);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please select the link manually");
    }
  };

  const startOver = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 overflow-hidden">
          {/* Hero header */}
          <div className="relative bg-gradient-to-br from-orange-500 to-orange-400 text-white px-8 pt-8 pb-10">
            <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%),radial-gradient(circle_at_80%_80%,#fff_0,transparent_40%)]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur ring-1 ring-white/30 mb-4">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Forgot password
                <span className="opacity-60">?</span>
              </h1>
              <p className="text-sm text-white/85 mt-1.5 leading-relaxed">
                {result
                  ? "We've prepared a one-time reset link for your account."
                  : "Enter your email — we'll send a one-time link to reset your password."}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(submit)}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email",
                          },
                        })}
                        type="email"
                        id="email"
                        placeholder="alice@dokanxpress.dev"
                        className="w-full pl-10 pr-3 py-3 rounded-xl ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm transition"
                      />
                    </div>
                    {formState.errors.email && (
                      <p className="text-xs text-red-600 mt-1.5">
                        {formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-medium py-3 transition-colors"
                  >
                    {isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Generating link…</span>
                      </>
                    ) : (
                      <>
                        <span>Send reset link</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="text-center text-sm text-gray-500">
                    Remembered it?{" "}
                    <Link
                      href="/login"
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Back to sign in
                    </Link>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Status banner */}
                  <div
                    className={`flex items-start gap-3 rounded-xl p-4 ${
                      result.emailSent
                        ? "bg-emerald-50 ring-1 ring-emerald-100"
                        : "bg-orange-50 ring-1 ring-orange-100"
                    }`}
                  >
                    <CheckCircle2
                      size={18}
                      className={`shrink-0 mt-0.5 ${
                        result.emailSent ? "text-emerald-600" : "text-orange-600"
                      }`}
                    />
                    <div className="text-sm">
                      <p
                        className={`font-medium ${
                          result.emailSent ? "text-emerald-900" : "text-orange-900"
                        }`}
                      >
                        {result.emailSent
                          ? "Email sent"
                          : "Reset link generated"}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Sent to{" "}
                        <span className="font-medium text-gray-800">
                          {result.email}
                        </span>
                        {result.expiresIn ? (
                          <>
                            {" · "}
                            expires in {result.expiresIn}
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>

                  {/* Reset link card */}
                  <div className="rounded-xl ring-1 ring-gray-200 overflow-hidden">
                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-orange-500" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                        One-time reset link
                      </span>
                    </div>
                    <div className="p-3 bg-white">
                      <div className="font-mono text-[11px] text-gray-600 break-all bg-gray-50 rounded-lg p-3 ring-1 ring-gray-100 max-h-24 overflow-y-auto">
                        {result.resetLink}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={copyLink}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg ring-1 ring-gray-200 hover:bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition"
                        >
                          <Copy size={14} />
                          {copied ? "Copied" : "Copy link"}
                        </button>
                        <a
                          href={result.resetLink}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 px-3 py-2 text-sm font-medium text-white transition"
                        >
                          <span>Open</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {!result.emailSent && (
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      Email delivery is currently unavailable in this demo
                      environment, so we surface the reset link here directly.
                      Use the link above to set a new password.
                    </p>
                  )}

                  <button
                    onClick={startOver}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 transition"
                  >
                    <ArrowLeft size={14} />
                    Use a different email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-6">
          Trouble signing in?{" "}
          <Link href="/support" className="text-orange-600 hover:text-orange-700">
            Contact support
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
