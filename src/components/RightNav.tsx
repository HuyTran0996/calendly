"use client";

import Link from "next/link";

const RightNav = ({ email }: { email: string }) => {
  const hasLoggedOut =
    typeof window !== "undefined" &&
    window.location.href.includes("logged-out");
  if (email && !hasLoggedOut) {
    return (
      <nav className="flex items-center gap-4">
        <Link href={"/dashboard"} className="btn-blue">
          Dashboard
        </Link>
        <a href={"/api/logout"}>Logout</a>
      </nav>
    );
  } else {
    return (
      <nav className="flex items-center gap-4">
        <Link href={"/api/auth"}>Sign in</Link>
        <Link href={"/pricing"} className="btn-blue">
          Get started
        </Link>
      </nav>
    );
  }
};

export default RightNav;
