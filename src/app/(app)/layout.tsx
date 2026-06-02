import { NavProvider } from "@/lib/nav-context";
import { DataProvider } from "@/lib/data-store";
import { ThemeProvider } from "@/lib/theme-context";
import { AppShell } from "@/components/layout/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DataProvider>
        <NavProvider>
          <AppShell>{children}</AppShell>
        </NavProvider>
      </DataProvider>
    </ThemeProvider>
  );
}
