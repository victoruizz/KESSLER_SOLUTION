import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface Session {
  email: string;
  name: string;
  avatar: string | null;
  visitor: boolean;
  since: string;
}

export interface ProfileChanges {
  name?: string;
  avatar?: string | null;
}

interface SessionContextValue {
  session: Session | null;
  login: (email: string) => void;
  continueAsVisitor: () => void;
  updateProfile: (changes: ProfileChanges) => void;
  logout: () => void;
}

const STORAGE_KEY = "kessler.session.v1";

const SessionContext = createContext<SessionContextValue | null>(null);

function readStoredSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (typeof parsed.name !== "string" || typeof parsed.visitor !== "boolean") {
      return null;
    }
    return { ...parsed, avatar: typeof parsed.avatar === "string" ? parsed.avatar : null };
  } catch {
    return null;
  }
}

function nameFromEmail(email: string): string {
  const handle = email.split("@")[0] ?? "Operador";
  return handle
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "Operador";
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => readStoredSession());

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      return;
    }
  }, [session]);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      login: (email: string) =>
        setSession({
          email,
          name: nameFromEmail(email),
          avatar: null,
          visitor: false,
          since: new Date().toISOString(),
        }),
      continueAsVisitor: () =>
        setSession({
          email: "",
          name: "Visitante",
          avatar: null,
          visitor: true,
          since: new Date().toISOString(),
        }),
      updateProfile: (changes: ProfileChanges) =>
        setSession((current) => {
          if (!current) return current;
          const nextName =
            typeof changes.name === "string" && changes.name.trim().length > 0
              ? changes.name.trim()
              : current.name;
          const nextAvatar = changes.avatar !== undefined ? changes.avatar : current.avatar;
          return { ...current, name: nextName, avatar: nextAvatar };
        }),
      logout: () => setSession(null),
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useSession deve ser usado dentro de SessionProvider");
  }
  return value;
}
