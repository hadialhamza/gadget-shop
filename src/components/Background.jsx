"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// --- Light Mode Component: Morning Mist ---
const MorningMistBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full bg-[#f8fafc]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, 
              rgba(248,250,252,1) 0%, 
              rgba(219,234,254,0.7) 30%, 
              rgba(165,180,252,0.5) 60%, 
              rgba(129,140,248,0.6) 100%
            ),
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(199,210,254,0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(224,231,255,0.3) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  );
};

// --- Dark Mode Component: Aurora Waves ---
const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full bg-[#0f172a] overflow-hidden">
      {/* Note: If you are not using the built-in Next.js styled-jsx, 
        you might need to move this @keyframes definition to your global CSS file.
      */}
      <style jsx global>{`
        @keyframes aurora {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0.5;
          }
        }
      `}</style>
      <div
        className="absolute inset-[-50%] w-[200%] h-[200%]"
        style={{
          background: `linear-gradient(45deg, #1a1a1a 0%, #003366 100%),
            repeating-linear-gradient(
              45deg,
              rgba(0, 255, 255, 0.1) 0px,
              rgba(0, 255, 255, 0.1) 20px,
              rgba(0, 255, 0, 0.1) 20px,
              rgba(0, 255, 0, 0.1) 40px
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(32, 196, 232, 0.3) 0%,
              rgba(76, 201, 240, 0.1) 100%
            )`,
          backgroundBlendMode: "normal, overlay, overlay",
          animation: "aurora 60s linear infinite",
        }}
      />
    </div>
  );
};

// --- Main Switcher Component ---
export default function ThemeBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {resolvedTheme === "dark" ? (
        <AuroraBackground />
      ) : (
        <MorningMistBackground />
      )}
    </>
  );
}
