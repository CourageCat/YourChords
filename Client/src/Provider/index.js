import { createContext } from 'react';

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const BACK_END_PORT = 'http://localhost:8080';
  console.log(BACK_END_PORT)
  return (
    <GlobalContext.Provider value={{ BACK_END_PORT }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
