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
    <>
      <div className="fixed flex justify-end w-full m-auto p-2.5 pl-10 pr-10">
        <div className="flex justify-center items-center gap-5 max-w-6xl	">
          <Switch
            checked={currentTheme === "dark"}
            onCheckedChange={toggleTheme}
          />
          <p>User name</p>

          <LogoutModal />
        </div>
      </div>
    </>
  );
};

export default Navbar;
