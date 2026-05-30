import { NavProvider } from "@/lib/nav-context";
import { AppShell } from "@/components/layout/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <AppShell>{children}</AppShell>
    </NavProvider>
  );
}
