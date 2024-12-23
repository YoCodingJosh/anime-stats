import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";
import { use } from "react";
import ThemeContext from "./theme-context";

export default function TitleBar() {
  const { theme, setTheme } = use(ThemeContext);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-lg font-semibold">CodingJosh's Anime Stats</h1>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={theme === 'light'}
                onClick={() => setTheme('light')}
              >
                Light
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={theme === 'dark'}
                onClick={() => setTheme('dark')}
              >
                Dark
                <span className="ml-auto w-8 h-auto">
                  <img className="pointer-events-none" src="/img/3878_darkness_lewdest.gif" alt="Darkness heavy breathing" />
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={theme === 'system'}
                onClick={() => setTheme('system')}
              >
                System
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
