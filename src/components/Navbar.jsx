"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

const Navbar = () => {
  const { data: session } = useSession();
  const navOptions = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/products">All Gadgets</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/support">Support</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          GadgetShop
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        {session ? (
          <div className="dropdown dropdown-end ml-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {/* ইউজারের ছবি থাকলে দেখাবে, না থাকলে ডিফল্ট */}
                <img
                  alt="User"
                  src={
                    session.user?.image ||
                    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">{session.user?.name}</li>
              <li>
                <Link href="/dashboard/add-product">Add Product</Link>
              </li>
              <li>
                <Link href="/dashboard/manage-products">Manage Products</Link>
              </li>
              <li>
                <button onClick={() => signOut()} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary px-5">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
