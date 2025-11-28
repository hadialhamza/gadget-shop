"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
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
  User,
  Camera,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShoppingBag,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);
      try {
        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const imgbbData = await imgbbRes.json();

        if (imgbbData.success) {
          imageUrl = imgbbData.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "Could not upload image. Please try again.",
          confirmButtonColor: "#EF4444",
        });
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: imageUrl || "https://i.ibb.co/5GzXkwq/user.png",
        }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Welcome aboard!",
          text: "Registration successful. Please login to continue.",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          iconColor: "#10B981",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const data = await res.json();
        const errorMsg = data.message || "Registration failed";
        setError(errorMsg);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errorMsg,
          confirmButtonColor: "#EF4444",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please check your connection.",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
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

  const passwordRequirements = [
    { text: "At least 6 characters", met: formData.password.length >= 6 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "Contains number", met: /\d/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-3"
        >
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-background p-1.5 rounded-lg border border-border">
                <ShoppingBag className="h-6 w-6 text-primary group-hover:rotate-y-180 transition-transform duration-300" />
              </div>
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">
              Next
              <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Gadget
              </span>
            </span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-20">
          {/* Left Side Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="relative overflow-hidden border-border/50 shadow-2xl bg-card/50 backdrop-blur-xl">
              <CardHeader className="text-center pb-6">
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Create Account
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription>
                    Join thousands of tech enthusiasts
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-5">
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 p-0.5">
                      <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center overflow-hidden">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="h-10 w-10 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <label className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer shadow-lg hover:bg-primary/90 transition-colors duration-200 group">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </motion.div>

                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isFocused.name
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <User className="h-5 w-5" />
                      </div>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        onFocus={() =>
                          setIsFocused((prev) => ({ ...prev, name: true }))
                        }
                        onBlur={() =>
                          setIsFocused((prev) => ({ ...prev, name: false }))
                        }
                        className="pl-11 h-12 bg-background/50 border-input transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isFocused.email
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Mail className="h-5 w-5" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        onFocus={() =>
                          setIsFocused((prev) => ({ ...prev, email: true }))
                        }
                        onBlur={() =>
                          setIsFocused((prev) => ({ ...prev, email: false }))
                        }
                        className="pl-11 h-12 bg-background/50 border-input transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isFocused.password
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        onFocus={() =>
                          setIsFocused((prev) => ({ ...prev, password: true }))
                        }
                        onBlur={() =>
                          setIsFocused((prev) => ({ ...prev, password: false }))
                        }
                        className="pl-11 pr-11 h-12 bg-background/50 border-input transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isFocused.confirmPassword
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        onFocus={() =>
                          setIsFocused((prev) => ({
                            ...prev,
                            confirmPassword: true,
                          }))
                        }
                        onBlur={() =>
                          setIsFocused((prev) => ({
                            ...prev,
                            confirmPassword: false,
                          }))
                        }
                        className="pl-11 pr-11 h-12 bg-background/50 border-input transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <AnimatePresence>
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 rounded-lg bg-muted/50 border border-border"
                      >
                        <p className="text-xs font-semibold mb-2">
                          Password Requirements:
                        </p>
                        <div className="space-y-1">
                          {passwordRequirements.map((req, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  req.met
                                    ? "bg-green-500"
                                    : "bg-muted-foreground/30"
                                }`}
                              />
                              <span
                                className={`text-xs ${
                                  req.met
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600"
                      >
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 btn-primary-custom"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <span className="flex items-center gap-2">
                          Create Account
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="w-full h-12 rounded-xl border-2 border-border/50 hover:bg-accent/50 transition-all"
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
                    Continue with Google
                  </Button>
                </motion.div>
              </CardContent>

              <CardFooter className="justify-center pt-6">
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-muted-foreground text-center"
                >
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary font-semibold hover:underline transition-colors inline-flex items-center gap-1"
                  >
                    Sign in here
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.p>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left hidden lg:block"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Join Our{" "}
              <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Tech Community
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Create your account and discover the world of cutting-edge
              gadgets. Get personalized recommendations, exclusive deals, and
              join 50,000+ tech enthusiasts.
            </p>

            <div className="space-y-4">
              {[
                { icon: Sparkles, text: "Personalized gadget recommendations" },
                { icon: CheckCircle2, text: "Exclusive member-only deals" },
                { icon: CheckCircle2, text: "Early access to new products" },
                { icon: CheckCircle2, text: "24/7 customer support" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <div className="p-1 bg-primary/10 rounded-full">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
