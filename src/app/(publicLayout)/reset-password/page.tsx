"use client";

import config from "@/src/config";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Mail,
} from "lucide-react";

type FormValues = {
  password: string;
  confirm: string;
};

// Crude but useful client-side strength meter — 0–4.
const scorePassword = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = [
  "bg-gray-200",
  "bg-red-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-emerald-500",
];

const ResetPasswordInner = () => {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || "";
  const token = params.get("token") || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password") || "";
  const strength = useMemo(() => scorePassword(password), [password]);

  // Missing token / email — link is broken or expired link copy-paste
  if (!email || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white px-8 py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur ring-1 ring-white/30 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Invalid reset link
            </h1>
            <p className="text-sm text-white/85 mt-1.5">
              This link is missing required parameters. It may have been broken
              when copied or has already been used.
            </p>
          </div>
          <div className="p-8 space-y-3">
            <Link
              href="/forgot-password"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 transition-colors"
            >
              <span>Request a new reset link</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 transition"
            >
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const submit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.base_url}/auth/reset-password`,
        { password: data.password, email },
        { headers: { Authorization: token } },
      );
      const result = res.data;
      if (result?.success) {
        setDone(true);
        toast.success(result?.message ?? "Password updated");
      } else {
        toast.error(result?.message ?? "Could not reset password");
      }
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Reset link is invalid or expired";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => router.push("/login")}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </button>

        <div className="bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 overflow-hidden">
          {/* Hero */}
          <div className="relative bg-gradient-to-br from-orange-500 to-orange-400 text-white px-8 pt-8 pb-10">
            <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%),radial-gradient(circle_at_80%_80%,#fff_0,transparent_40%)]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur ring-1 ring-white/30 mb-4">
                {done ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Lock className="w-6 h-6" />
                )}
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {done ? "All set" : "Set a new password"}
                <span className="opacity-60">{done ? "!" : ""}</span>
              </h1>
              <p className="text-sm text-white/85 mt-1.5 leading-relaxed">
                {done
                  ? "Your password has been updated. Sign in with the new one."
                  : "Pick something memorable but hard to guess."}
              </p>
              {!done && email && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-[11px] font-medium">
                  <Mail size={12} />
                  <span>{email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(submit)}
                  className="space-y-5"
                >
                  {/* New password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2"
                    >
                      New password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "At least 8 characters",
                          },
                        })}
                        type={showPwd ? "text" : "password"}
                        id="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 rounded-xl ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                        aria-label={showPwd ? "Hide password" : "Show password"}
                      >
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-600 mt-1.5">
                        {errors.password.message}
                      </p>
                    )}

                    {/* Strength meter */}
                    {password && (
                      <div className="mt-2.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                strength >= i
                                  ? STRENGTH_COLOR[strength]
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1.5">
                          Strength:{" "}
                          <span
                            className={`font-medium ${
                              strength >= 3
                                ? "text-emerald-600"
                                : strength >= 2
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {STRENGTH_LABEL[strength] || "—"}
                          </span>
                          {strength < 4 && (
                            <span className="text-gray-400">
                              {" · "}
                              {[
                                strength < 1 && "8+ chars",
                                !/[A-Z]/.test(password) && "uppercase",
                                !/[0-9]/.test(password) && "number",
                                !/[^A-Za-z0-9]/.test(password) && "symbol",
                              ]
                                .filter(Boolean)
                                .slice(0, 2)
                                .join(", ")}
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm */}
                  <div>
                    <label
                      htmlFor="confirm"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <ShieldCheck
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <input
                        {...register("confirm", {
                          required: "Please confirm your password",
                          validate: (v) =>
                            v === password || "Passwords don't match",
                        })}
                        type={showConfirm ? "text" : "password"}
                        id="confirm"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 rounded-xl ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                        aria-label={
                          showConfirm ? "Hide password" : "Show password"
                        }
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.confirm && (
                      <p className="text-xs text-red-600 mt-1.5">
                        {errors.confirm.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || strength < 2}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-medium py-3 transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Updating…</span>
                      </>
                    ) : (
                      <>
                        <span>Update password</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                    By updating your password you'll be signed out of all other
                    sessions for security.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="flex items-start gap-3 rounded-xl p-4 bg-emerald-50 ring-1 ring-emerald-100">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 mt-0.5 text-emerald-600"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-emerald-900">
                        Password updated
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        You can now sign in to{" "}
                        <span className="font-medium text-gray-800">
                          {email}
                        </span>{" "}
                        with your new password.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/login"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 transition-colors"
                  >
                    <span>Sign in</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-6">
          Trouble?{" "}
          <Link
            href="/support"
            className="text-orange-600 hover:text-orange-700"
          >
            Contact support
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

const ResetPassword = () => (
  <Suspense fallback={null}>
    <ResetPasswordInner />
  </Suspense>
);

export default ResetPassword;
