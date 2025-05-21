"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SignIn = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <h3>
          <Link className="" href="/signin">
            Sign In
          </Link>
        </h3>
      )}
    </div>
  );
};

export default SignIn;
