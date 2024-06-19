"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

type ContextType = {
  token: string;
  setToken: (token: string) => void;
};

type Props = {
  children: ReactNode;
};

const TokenContext = createContext<ContextType | undefined>(undefined);

export const useToken = (): ContextType => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

const TokenProvider = ({ children }: Props) => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");

  const checkToken = () => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      router.push("/login");
    } else {
      setToken(localToken);
    }
  };

  useEffect(() => {
    checkToken();
  }, [router]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
