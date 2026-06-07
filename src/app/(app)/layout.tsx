import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NavProvider } from "@/lib/nav-context";
import { DataProvider } from "@/lib/data-store";
import { ThemeProvider } from "@/lib/theme-context";
import { AppShell } from "@/components/layout/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth guard — second line of defence after middleware
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
