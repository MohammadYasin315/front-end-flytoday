import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { loginSuccess, logout } from "@/store/authSlice";
import { getAccessToken } from "@/components/utils/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { phoneNumber, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Check localStorage and sync with Redux
    const syncAuth = () => {
      const token = getAccessToken();
      const storedPhoneNumber = localStorage.getItem("phoneNumber");

      if (token && storedPhoneNumber) {
        // User is authenticated
        if (!isAuthenticated || phoneNumber !== storedPhoneNumber) {
          dispatch(loginSuccess(storedPhoneNumber));
        }
      } else {
        // User is not authenticated
        if (isAuthenticated) {
          dispatch(logout());
        }
      }
      setIsLoading(false);
    };

    syncAuth();

    // Listen for storage changes (multi-tab support)
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
    isLoading,
  };
};
