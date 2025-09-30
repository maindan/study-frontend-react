import type { Profile } from "@/interfaces/profile";
import { create } from "zustand";
import { persist } from "zustand/middleware";



type ProfileState = {
    profile: Profile | null;
    setProfile: (data: Profile) => void;
    getProfile: () => Profile | null;
};

export const useProfileStore = create<ProfileState>()(
    persist(
        (set, get) => ({
            profile: null,

            setProfile: (profile: Profile) => {
                set({profile});
            },

            getProfile: () => {
                return get().profile;
            }
        }),
        {
            name: "profile-storage",
        }
    )
)