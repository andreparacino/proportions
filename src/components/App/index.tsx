import Proportion from "components/Proportion";
import ErrorOverlay from "components/UI/ErrorOverlay";
import React, { createContext, Dispatch } from "react";
import { useState } from "react";
import styles from "./index.module.scss";

interface AppContextInterface {
  displayedError: string | null;
  setDisplayedError: Dispatch<React.SetStateAction<string | null>>;
}

export const AppContext = createContext<AppContextInterface>({
  displayedError: null,
  setDisplayedError: () => {},
});

function App() {
  const [displayedError, setDisplayedError] = useState<string | null>(null);
  const value = { displayedError, setDisplayedError };

  return (
    <main className={styles.App}>
      <AppContext.Provider value={value}>
        <Proportion />
        <ErrorOverlay />
      </AppContext.Provider>
    </main>
  );
}

export default App;
