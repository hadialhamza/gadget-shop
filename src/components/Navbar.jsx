"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  PackagePlus,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Gadgets" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={`
      sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
      ${
        scrolled
          ? "border-b bg-background/95 backdrop-blur-xl shadow-sm py-0"
          : "border-b border-transparent bg-linear-to-r from-background via-background/95 to-background py-2"
      }
    `}
    >
      {/* Animated Background linear */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />

      <div className="container relative flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo & Desktop Menu */}
        <div className="flex items-center gap-8">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5 transition-transform duration-200" />
                  ) : (
                    <Menu className="h-5 w-5 transition-transform duration-200" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 border-r-0 bg-background/95 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-8 mt-8 px-2">
                  {/* Logo in Mobile Menu */}
                  <Link
                    href="/"
                    className="flex items-center gap-3 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-primary to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
                      <ShoppingBag className="h-7 w-7 relative text-white" />
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      GadgetShop
                    </span>
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-linear-to-r from-green-400 to-blue-500 text-white border-0"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  </Link>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 text-lg font-medium p-3 rounded-xl hover:bg-accent transition-all duration-200 hover:translate-x-2 group"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-1 h-6 bg-linear-to-b from-primary to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Auth Section */}
                  <div className="pt-6 border-t">
                    {session ? (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50">
                          <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                            <AvatarImage
                              src={session.user?.image}
                              alt={session.user?.name}
                            />
                            <AvatarFallback className="bg-linear-to-r from-primary to-purple-500 text-white">
                              {session.user?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {session.user?.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/dashboard/add-product"
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <PackagePlus className="h-5 w-5 text-primary" />
                          Add Product
                        </Link>

                        <Link
                          href="/dashboard/manage-products"
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-5 w-5 text-primary" />
                          Manage Products
                        </Link>

                        <Button
                          variant="ghost"
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                          className="justify-start gap-3 p-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <LogOut className="h-5 w-5" />
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        asChild
                        className="w-full bg-linear-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                      >
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-background p-1.5 rounded-lg">
                <ShoppingBag className="h-6 w-6 bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              GadgetShop
            </span>
            <Badge
              variant="secondary"
              className="ml-2 bg-linear-to-r from-green-400 to-blue-500 text-white border-0 hidden sm:flex"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              New
            </Badge>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-primary to-purple-500 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative h-9 w-9 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-accent"
            >
              <div className="relative">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute top-0 left-0 h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </div>
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* Auth Menu */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 px-2 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-accent group"
                >
                  <Avatar className="h-7 w-7 ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                    <AvatarImage
                      src={session.user?.image}
                      alt={session.user?.name}
                    />
                    <AvatarFallback className="bg-linear-to-r from-primary to-purple-500 text-white text-sm">
                      {session.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 ml-1 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 border-0 bg-background/95 backdrop-blur-xl shadow-xl rounded-xl p-2"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal p-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-linear-to-r from-transparent via-border to-transparent" />

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer p-3 rounded-lg transition-all duration-200 hover:bg-accent hover:translate-x-1"
                >
                  <Link
                    href="/dashboard/add-product"
                    className="flex items-center gap-3"
                  >
                    <div className="p-1.5 rounded-md bg-blue-500/10">
                      <PackagePlus className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Add Product</p>
                      <p className="text-xs text-muted-foreground">
                        Create new listing
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer p-3 rounded-lg transition-all duration-200 hover:bg-accent hover:translate-x-1"
                >
                  <Link
                    href="/dashboard/manage-products"
                    className="flex items-center gap-3"
                  >
                    <div className="p-1.5 rounded-md bg-green-500/10">
                      <LayoutDashboard className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Manage Products</p>
                      <p className="text-xs text-muted-foreground">
                        View all listings
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-linear-to-r from-transparent via-border to-transparent" />

                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer p-3 rounded-lg transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-950/20 hover:translate-x-1 text-red-600 dark:text-red-400"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-red-500/10">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Log out</p>
                      <p className="text-xs text-muted-foreground">
                        End your session
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-linear-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
              <Link href="/login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
