"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70"
            style={{ backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              className={`w-full ${width} rounded-t-3xl sm:rounded-2xl overflow-hidden`}
              style={{
                background: "linear-gradient(145deg,#151515,#111111)",
                border: "1px solid rgba(212,175,55,0.15)",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.05)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle (mobile) */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-10 h-1 rounded-full" style={{ background: "#2A2A2A" }} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "1px solid #1C1C1C", background: "linear-gradient(90deg,rgba(212,175,55,0.05),transparent 60%)" }}>
                <div className="flex items-center gap-3">
                  {icon && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background:"rgba(212,175,55,0.1)", border:"1px solid rgba(212,175,55,0.2)" }}>
                      {icon}
                    </div>
                  )}
                  <div>
                    <h3 className="text-[15px] font-light text-white"
                      style={{ fontFamily:"'Cormorant SC',serif", letterSpacing:"0.04em" }}>{title}</h3>
                    {subtitle && <p className="text-[11px] text-[#52525B] mt-0.5">{subtitle}</p>}
                  </div>
                </div>
                <button onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-[#3F3F46] hover:text-white hover:bg-[#1A1A1A] transition-all">
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
