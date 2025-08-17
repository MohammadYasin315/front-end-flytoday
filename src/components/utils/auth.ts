export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    console.log("🔑 Setting tokens to localStorage");
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    console.log("✅ Tokens saved successfully");
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    console.log("🔍 Retrieved accessToken jklsdf;:", token ? "exists" : "null");
    return token;
  }
  return null;
};

export const removeTokens = () => {
  if (typeof window !== "undefined") {
    console.log("🗑 Removing tokens from localStorage");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("✅ Tokens removed successfully");
  }
};

