import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useLogto } from "@logto/react";

const UserContext = createContext({
  userName: "",
  userEmail: "",
  userId: "",
  phoneNumber: "",
  location: "",
  token: null,
  isProfileLoaded: false,
  refreshProfile: () => {},
});

export function UserProvider({ children }) {
  const { isAuthenticated, getIdTokenClaims, getIdToken } = useLogto();
  const [profile, setProfile] = useState({
    userName: "",
    userEmail: "",
    userId: "",
    phoneNumber: "",
    location: "",
  });
  const [token, setToken] = useState(null);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const hasFetched = useRef(false);

  const fetchProfile = useCallback(async () => {
    try {
      const claims = await getIdTokenClaims();
      if (claims?.sub) {
        const t = await getIdToken();
        if (t) {
          setToken(t);
          const res = await fetch("/api/profile", {
            headers: { Authorization: `Bearer ${t}` },
          });
          if (res.ok) {
            const data = await res.json();
            if (data) {
              setProfile({
                userName: data.name || "",
                userEmail: data.email || claims.email || "",
                userId: claims.sub,
                phoneNumber: data.phone_number || "",
                location: data.location || "",
              });
            }
          }
          setIsProfileLoaded(true);
        }
      }
    } catch (err) {
      console.error("UserProvider: Failed to fetch profile:", err);
      setIsProfileLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAuthenticated || hasFetched.current) return;
    hasFetched.current = true;
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const refreshProfile = useCallback(async () => {
    // Allow re-fetching after a save
    await fetchProfile();
  }, [fetchProfile]);

  return (
    <UserContext.Provider
      value={{
        ...profile,
        token,
        isProfileLoaded,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
