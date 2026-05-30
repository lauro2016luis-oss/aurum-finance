"use client";

import { createContext, useContext, useState } from "react";

interface NavContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  hideValues: boolean;
  toggleHideValues: () => void;
}

const NavContext = createContext<NavContextType>({
  sidebarOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
  hideValues: false,
  toggleHideValues: () => {},
});

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideValues, setHideValues] = useState(false);

  return (
    <NavContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen((v) => !v),
        closeSidebar: () => setSidebarOpen(false),
        hideValues,
        toggleHideValues: () => setHideValues((v) => !v),
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
