import { createContext, useContext, useState } from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uuid, setUuid] = useState(null);
  const [session, setSession] = useState(null);

  const logout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUuid(null);
    setSession(null);
  };

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
    setUuid(session?.user?.id || null);
    setSession(session);
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error };
    setIsLoggedIn(true);
    setSession(data.session);
    setUuid(data.session?.user?.id || null);
    return { error: null };
  };

  const register = async (email, password, profileData) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error };

    const userId = uuid;
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: userId,
        displayName: profileData["username"],
        bio: profileData["bio"],
        avatarUrl: profileData["avatar_url"],
        gender: profileData["gender"],
        dateOfBirth: profileData["dateOfBirth"],
        nativeLanguage: profileData["nativeLanguage"],
        learningLanguage: profileData["learningLanguage"],
        proficiencyLevel: profileData["proficiencyLevel"],
        level: profileData["level"],
        //createdAt: new Date().toISOString(),
        interests: profileData["interests"],
      },
    ]);

    if (profileError) return { error: profileError };

    setIsLoggedIn(true);
    setSession(data.session);
    setUuid(userId);
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        uuid,
        session,
        login,
        logout,
        register,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
