"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  PackagePlus,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Gadgets" },
    { href: "/dashboard/add-product", label: "Add Gadget" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        scrolled
          ? " shadow-md py-0 bg-background/50 backdrop-blur-md"
          : "  py-2"
      }`}
    >
      <div className="container mx-auto relative flex items-center justify-between px-2 sm:px-4 py-3">
        <div className="flex items-center gap-1">
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative h-9 w-9 rounded-full sm:mr-1.5"
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
                className="w-80 border-r-0 bg-background/90 backdrop-blur-xl"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation links
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-2">
                  {/* Small device Menu logo*/}
                  <Link
                    href="/"
                    className="flex items-center gap-3 group ml-5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-50 group-hover:opacity-60 transition-opacity" />
                      <ShoppingBag className="h-7 w-7 relative text-blue-500" />
                    </div>
                    <span className="text-2xl font-heading font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      NextGadget
                    </span>
                  </Link>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 font-medium p-3 rounded-xl hover:bg-accent transition-all duration-200 hover:translate-x-2 group"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-1 h-6 bg-linear-to-b from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
                            <AvatarFallback className="bg-linear-to-r from-blue-500 to-cyan-500 text-white">
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
                          className="flex items-center font-medium gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <PackagePlus className="h-5 w-5 text-primary" />
                          Add Product
                        </Link>

                        <Link
                          href="/dashboard/manage-products"
                          className="flex items-center font-medium gap-3 p-3 rounded-xl hover:bg-accent transition-all duration-200"
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
                          className="text-base justify-start gap-3 p-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl"
                        >
                          <LogOut className="h-5 w-5" />
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        asChild
                        className="w-11/12 block mx-auto btn-primary-custom"
                      >
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="flex items-center gap-2 justify-center">
                            <User />
                            Login
                          </span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative hidden sm:flex">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-background p-1.5 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600 group-hover:rotate-y-180 transition-transform duration-600" />
              </div>
            </div>
            <span className="font-heading text-2xl font-bold">
              Next
              <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Gadget
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-1 text-sm font-medium transition-all duration-200 hover:text-primary group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10" />
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 sm:gap-4 ml-1">
          <ThemeToggle />

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
                    <AvatarFallback className="bg-linear-to-r from-blue-600 to-cyan-500 text-white text-sm">
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
            <Button asChild className="btn-primary-custom">
              <Link href="/login">
                <span className="flex items-center gap-1 sm:gap-2">
                  <User />
                  Login
                </span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
