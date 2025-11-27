"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
  Shield,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerSections = [
    {
      title: "Explore",
      links: [
        { name: "Home", href: "/" },
        { name: "All Gadgets", href: "/products" },
        { name: "About Us", href: "/about" },
      ],
    },
    {
      title: "Account",
      links: [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
        { name: "Manage Products", href: "/dashboard/manage-products" },
      ],
    },
  ];

  const paymentMethods = ["Visa", "Mastercard", "PayPal", "Bkash"];

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden border-t border-slate-800">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 group mb-6 w-fit"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                  <ShoppingBag className="h-6 w-6 text-blue-400 group-hover:rotate-y-180 transition-transform duration-600" />
                </div>
              </div>
              <span className="font-heading text-2xl font-bold">
                Next
                <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Gadget
                </span>
              </span>
            </Link>

            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              Your premier destination for cutting-edge technology. We bring you
              the future today with premium products.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                { icon: Twitter, href: "#", color: "hover:text-sky-400" },
                { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                { icon: Youtube, href: "#", color: "hover:text-red-400" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 ${social.color} transition-colors`}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="font-semibold text-lg mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-200 group text-sm"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-white">
              Stay Updated
            </h3>
            <p className="text-slate-400 mb-4 text-sm">
              Subscribe to get the latest news and special offers.
            </p>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
                />
                <Button className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-none px-3">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>

              <Badge
                variant="outline"
                className="bg-slate-900/50 text-slate-500 border-slate-800 font-normal py-1"
              >
                <Shield className="h-3 w-3 mr-1.5" />
                100% Secure & Spam-free
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-t border-slate-800">
          <div className="text-sm text-slate-500">
            © {currentYear} NextGadget. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold hidden sm:block">
              We accept:
            </span>
            <div className="flex items-center gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-400 text-[10px] font-medium uppercase"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-slate-500">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" />
            <span>in Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
