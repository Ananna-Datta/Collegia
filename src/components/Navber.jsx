"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Navber = () => {
  const { data: session, status } = useSession();

  const navMenu = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/colleges">Colleges</Link>
      </li>
      <li>
        <Link href="/admission">Admission</Link>
      </li>
      <li>
        <Link href="/my-college">My College</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Start: Mobile Menu + Logo */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navMenu}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Collegia
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navMenu}</ul>
      </div>

      {/* End: Login/Profile Button */}
      <div className="navbar-end">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session?.user ? (
          <div className="flex items-center gap-3">
            <p className="font-semibold">Hello, {session.user.name || session.user.email}</p>
            <button
              onClick={() => signOut()}
              className="btn btn-secondary btn-sm"
              type="button"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navber;
