"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInPage() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center my-36 gap-4">
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
        <>
          <button
            onClick={() => signIn("github")}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Sign In with GitHub
          </button>

          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign In with Google
          </button>
        </>
      )}
    </main>
  );
}
