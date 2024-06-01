import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ui/theme-provider";
import LogoutModal from "./LogoutModal";

type Theme = "light" | "dark" | "system";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="fixed w-full bg-background text-foreground shadow-md rounded">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <span className="text-4xl">🪙</span>
          <h2 className="text-2xl font-bold">FinanceTracker</h2>
        </div>
        <div className="flex items-center gap-5">
          <Switch
            checked={currentTheme === "dark"}
            onCheckedChange={toggleTheme}
          />
          <p>User name</p>
          <LogoutModal />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
