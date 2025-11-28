"use client";

import {
  Users,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Star,
  Clock,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

const StatsSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-transparent relative overflow-hidden">
      <div className="container mx-auto">
        {/* Stats Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative pt-12 border-t border-border/50"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-1/4 w-20 h-20 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-1/4 w-16 h-16 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur-xl"></div>
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Customers */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute w-16 h-16 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative bg-linear-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg shadow-blue-500/25">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <motion.h4
                className="text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                50k+
              </motion.h4>
              <p className="text-sm text-muted-foreground font-medium">
                Happy Customers
              </p>
              <div className="mt-2 text-xs text-cyan-600 dark:text-cyan-400 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% this month
              </div>
            </motion.div>

            {/* Products */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute w-16 h-16 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative bg-linear-to-r from-cyan-500 to-blue-500 p-3 rounded-2xl shadow-lg shadow-cyan-500/25">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
              </div>
              <motion.h4
                className="text-4xl font-bold bg-linear-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                1.2k+
              </motion.h4>
              <p className="text-sm text-muted-foreground font-medium">
                Premium Products
              </p>
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                50+ new arrivals
              </div>
            </motion.div>

            {/* Ratings */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute w-16 h-16 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative bg-linear-to-r from-green-500 to-emerald-500 p-3 rounded-2xl shadow-lg shadow-green-500/25">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <motion.h4
                className="text-4xl font-bold bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                4.9/5
              </motion.h4>
              <p className="text-sm text-muted-foreground font-medium">
                Customer Ratings
              </p>
              <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                2k+ reviews
              </div>
            </motion.div>

            {/* Delivery */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute w-16 h-16 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative bg-linear-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg shadow-purple-500/25">
                  <Truck className="w-6 h-6 text-white" />
                </div>
              </div>
              <motion.h4
                className="text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              >
                24h
              </motion.h4>
              <p className="text-sm text-muted-foreground font-medium">
                Fast Delivery
              </p>
              <div className="mt-2 text-xs text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                98% on-time
              </div>
            </motion.div>
          </div>

          {/* Animated Progress Bars */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-border/30"
          >
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Customer Satisfaction</span>
                <span className="text-cyan-600 dark:text-cyan-400">98%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "98%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="bg-linear-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Order Completion</span>
                <span className="text-green-600 dark:text-green-400">95%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "95%" }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
