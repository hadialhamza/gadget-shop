"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
} from "lucide-react";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  // Custom configuration for SweetAlert to match your theme
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields before continuing.",
        confirmButtonColor: "#3b82f6",
        background: "#fff",
        color: "#1e293b",
      });
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: "Invalid email or password. Please try again.",
        confirmButtonColor: "#ef4444",
        background: "#fff",
        color: "#1e293b",
      });
      setLoading(false);
    } else {
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Signing you in successfully...",
        timer: 1500,
        showConfirmButton: false,
        confirmButtonColor: "#3b82f6",
      }).then(() => {
        router.push("/");
        router.refresh();
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white dark:bg-slate-800 p-1.5 rounded-lg shadow-lg">
                <Sparkles className="h-6 w-6 text-blue-600 group-hover:rotate-180 transition-transform duration-600" />
              </div>
            </div>
            <span className="font-heading text-2xl font-bold text-slate-800 dark:text-white">
              Next
              <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Gadget
              </span>
            </span>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-l from-blue-500/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-r from-cyan-500/5 to-transparent rounded-full translate-y-16 -translate-x-16" />

            <div className="relative z-10">
              <CardHeader className="text-center pb-6">
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Welcome Back
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                    Sign in to your account to continue
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-6">
                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isFocused.email ? "text-blue-500" : "text-slate-400"
                        }`}
                      >
                        <Mail className="h-5 w-5" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() =>
                          setIsFocused((prev) => ({ ...prev, email: true }))
                        }
                        onBlur={() =>
                          setIsFocused((prev) => ({ ...prev, email: false }))
                        }
                        className="pl-11 pr-4 py-3 h-12 rounded-xl border-2 bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isFocused.password
                            ? "text-blue-500"
                            : "text-slate-400"
                        }`}
                      >
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() =>
                          setIsFocused((prev) => ({ ...prev, password: true }))
                        }
                        onBlur={() =>
                          setIsFocused((prev) => ({ ...prev, password: false }))
                        }
                        className="pl-11 pr-11 py-3 h-12 rounded-xl border-2 bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Sign In
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="bg-slate-200 dark:bg-slate-700" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white dark:bg-slate-800 px-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      Or continue with
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="w-full h-12 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-600/50 transition-all duration-200 group"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                </motion.div>
              </CardContent>

              <CardFooter className="justify-center pt-6">
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-slate-600 dark:text-slate-400 text-center"
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-500 hover:text-blue-600 font-semibold hover:underline transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.p>
              </CardFooter>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500 dark:text-slate-400"
        >
          <Shield className="h-4 w-4" />
          <span>Your data is securely encrypted and protected</span>
        </motion.div>
      </div>
    </div>
  );
}
