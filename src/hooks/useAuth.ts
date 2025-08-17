import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { loginSuccess, logout } from "@/store/authSlice";
import { getAccessToken } from "@/components/utils/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { phoneNumber, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const syncAuth = () => {
      const token = getAccessToken();
      const storedPhoneNumber = localStorage.getItem("phoneNumber");

      if (token && storedPhoneNumber) {
        if (phoneNumber !== storedPhoneNumber) {
          dispatch(loginSuccess(storedPhoneNumber));
          console.log(
            "🔑 User authenticated with phone number:",
            storedPhoneNumber
          );
        }
      } else {
        dispatch(logout());
      }
      console.log(
        "🔄 Syncing authentication state with Redux store",
        phoneNumber,
        isAuthenticated
      );
    };

    syncAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "phoneNumber" || e.key === "accessToken") {
        syncAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch, isAuthenticated, phoneNumber]);

  return {
    phoneNumber,
    isAuthenticated,
  };
};
