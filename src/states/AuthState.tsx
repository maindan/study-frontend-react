import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    checkAuth: () => boolean;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            isAuthenticated: false,

            login: (token: string) => {
                set({token, isAuthenticated: true});
            },

            logout: () => {
                set({token: null, isAuthenticated: false});
            },

            checkAuth: () => {
                const token = get().token;
                return !!token;
            }
        }),
        {
            name: "auth-storage",
        }
    )
)