"use client";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  Zap,
  Clock,
  Award,
  Users,
} from "lucide-react";
import StatsSection from "./StatsSection";

const features = [
  {
    icon: ShoppingBag,
    title: "Authentic Products",
    description:
      "100% original items directly from brands with verified authenticity.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Express shipping with delivery within 2-3 days across the nation.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description:
      "Bank-level encryption ensures your transactions are always protected.",
    gradient: "from-blue-600 to-cyan-400",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you anytime, anywhere.",
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Quick processing and same-day dispatch for most orders.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Award,
    title: "Award Winning",
    description:
      "Recognized as the best gadget retailer for three consecutive years.",
    gradient: "from-cyan-600 to-blue-400",
  },
  {
    icon: Clock,
    title: "Easy Returns",
    description: "30-day hassle-free return policy for all products.",
    gradient: "from-blue-400 to-cyan-600",
  },
  {
    icon: Users,
    title: "Community Trust",
    description: "Join 500,000+ satisfied customers in our growing community.",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function WhyChooseSection() {
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="pt-20 px-4 md:px-8 bg-transparent">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="title-custom mb-4">
            Why Choose <span>NextGadget?</span>
          </h2>
          <p className="subtitle max-w-2xl mx-auto">
            We are committed to providing the best shopping experience with
            premium services and customer care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <div
                className={`absolute inset-0 bg-linear-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div
                className={`inline-flex p-3 rounded-xl bg-linear-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {feature.description}
              </p>

              <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-linear-to-r ${feature.gradient} group-hover:w-4/5 transition-all duration-300 rounded-full`}
              />
            </motion.div>
          ))}
        </motion.div>
        <StatsSection />
      </div>
    </section>
  );
}
