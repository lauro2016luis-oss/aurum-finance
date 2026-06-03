"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  width?: string;
}

export function Modal({ open, onClose, title, subtitle, children, icon, width = "max-w-lg" }: ModalProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70"
            style={{ backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal — z maior que overlay para receber toques */}
          <div className="fixed inset-0 z-[71] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              className={`w-full ${width} rounded-t-3xl sm:rounded-2xl overflow-hidden pointer-events-auto`}
              style={{
                background: isLight ? "linear-gradient(145deg,#FFFFFF,#FAFAF6)" : "linear-gradient(145deg,#151515,#111111)",
                border: isLight ? "1px solid #DDD9CC" : "1px solid rgba(212,175,55,0.15)",
                boxShadow: isLight
                  ? "0 -8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)"
                  : "0 -20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.05)",
                maxHeight: "85vh",
                overflowY: "auto",
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
              }}
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle (mobile) */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-10 h-1 rounded-full" style={{ background: isLight ? "#D0CEC0" : "#2A2A2A" }} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4"
                style={{
                  borderBottom: isLight ? "1px solid #DDD9CC" : "1px solid #1C1C1C",
                  background: isLight
                    ? "linear-gradient(90deg,rgba(160,120,10,0.04),transparent 60%)"
                    : "linear-gradient(90deg,rgba(212,175,55,0.05),transparent 60%)"
                }}>
                <div className="flex items-center gap-3">
                  {icon && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{
                        background: isLight ? "rgba(160,120,10,0.08)" : "rgba(212,175,55,0.1)",
                        border: isLight ? "1px solid rgba(160,120,10,0.2)" : "1px solid rgba(212,175,55,0.2)"
                      }}>
                      {icon}
                    </div>
                  )}
                  <div>
                    <h3 className="text-[15px] font-light"
                      style={{
                        fontFamily:"'Instrument Sans',sans-serif",
                        letterSpacing:"0.04em",
                        color: isLight ? "#1C1A14" : "#FFFFFF"
                      }}>{title}</h3>
                    {subtitle && <p className="text-[11px] mt-0.5" style={{ color: isLight ? "#6B6860" : "#52525B" }}>{subtitle}</p>}
                  </div>
                </div>
                <button onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all"
                  style={{
                    color: isLight ? "#6B6860" : "#3F3F46",
                    background: "transparent",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = isLight ? "#1C1A14" : "#FFFFFF";
                    (e.currentTarget as HTMLButtonElement).style.background = isLight ? "#EEECe4" : "#1A1A1A";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = isLight ? "#6B6860" : "#3F3F46";
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
