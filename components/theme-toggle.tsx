"use client";

import { useTheme } from "next-themes";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Both icons render; CSS picks one, so there is no hydration flash. */}
      <Icon icon={Moon02Icon} size={16} className="dark:hidden" />
      <Icon icon={Sun03Icon} size={16} className="hidden dark:block" />
    </Button>
  );
}
