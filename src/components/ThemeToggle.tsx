import { Moon, Sun, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "dark-grey">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | "dark-grey" | null;
    const initial = stored || "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "dark-grey") => {
    document.documentElement.classList.remove("dark", "dark-grey");
    if (newTheme !== "light") {
      document.documentElement.classList.add(newTheme);
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "dark-grey") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "dark-grey":
        return <Palette className="h-5 w-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="transition-transform hover:scale-110"
        >
          {getIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <Moon className="h-4 w-4 mr-2" />
          Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark-grey")}>
          <Palette className="h-4 w-4 mr-2" />
          Dark Grey
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <Sun className="h-4 w-4 mr-2" />
          Light Mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
