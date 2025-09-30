import type { StudyState } from "@/interfaces/studyState";
import { create } from "zustand";
import { persist } from "zustand/middleware";



type StudyStt = {
    study: StudyState | null;
    setStudy: (data: StudyState) => void;
    getStudy: () => StudyState | null;
};

export const useStudyStore = create<StudyStt>()(
    persist(
        (set, get) => ({
            study: null,

            setStudy: (study: StudyState) => {
                set({study});
            },

            getStudy: () => {
                return get().study;
            }
        }),
        {
            name: "study-storage",
        }
    )
)