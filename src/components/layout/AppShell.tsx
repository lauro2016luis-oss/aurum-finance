"use client";

import { useNav } from "@/lib/nav-context";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, closeSidebar } = useNav();

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden lg:ml-[260px] min-w-0">
        {children}
      </main>
    </div>
  );
}
