import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ui/theme-provider";
import LogoutModal from "./LogoutModal";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="fixed w-full bg-background text-foreground shadow-md rounded z-50">
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

          <div className="flex gap-1 items-center">
            <p>User name</p>
            <Avatar>
              <AvatarImage src="https://placehold.co/460x460?text=IMG" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <LogoutModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
