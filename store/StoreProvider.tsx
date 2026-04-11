"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { rehydrateAuth } from "./slices/authSlice";
import { rehydrateExam } from "./slices/examSlice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Rehydrate Auth
    const savedAuth = localStorage.getItem("auth_state");
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        store.dispatch(rehydrateAuth(parsedAuth));
      } catch (e) {
        console.error("Failed to rehydrate auth state", e);
      }
    }

    // Rehydrate Exam
    const savedExam = localStorage.getItem("exam_state");
    if (savedExam) {
      try {
        const parsedExam = JSON.parse(savedExam);
        store.dispatch(rehydrateExam(parsedExam));
      } catch (e) {
        console.error("Failed to rehydrate exam state", e);
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
