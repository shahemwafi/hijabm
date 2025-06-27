"use client";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
    return (
        <button
            className="bg-red-500 text-sm p-1.5 mx-3 rounded-xl hover:underline"
            onClick={() => {
                signOut({ callbackUrl: '/' });
                window.location.reload();
            }}
        >
            Logout
        </button>
    )
}