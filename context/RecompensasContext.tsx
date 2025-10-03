import React, { createContext, useContext, useState } from "react";

type RecompensasContextType = {
  estrelas: number;
  adicionarEstrela: () => void;
};

const RecompensasContext = createContext<RecompensasContextType | undefined>(
  undefined
);

export function RecompensasProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [estrelas, setEstrelas] = useState(0);

  const adicionarEstrela = () => setEstrelas((prev) => prev + 1);

  return (
    <RecompensasContext.Provider value={{ estrelas, adicionarEstrela }}>
      {children}
    </RecompensasContext.Provider>
  );
}

export function useRecompensas() {
  const context = useContext(RecompensasContext);
  if (!context)
    throw new Error(
      "useRecompensas deve ser usado dentro de RecompensasProvider"
    );
  return context;
}
