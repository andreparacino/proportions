import React, { createContext, Dispatch } from "react";
import { useState } from "react";

import Proportion from "@/components/Proportion";
import Logo from "@/components/UI/Logo";
import MessageOverlay from "@/components/UI/MessageOverlay";

import styles from "./index.module.scss";

type MessageType = "error" | "success";

type Message = {
  message: string;
  type: MessageType;
};

type AppContextInterface = {
  displayedMessage: Message | null;
  setDisplayedMessage: Dispatch<React.SetStateAction<Message | null>>;
};

export const AppContext = createContext<AppContextInterface>({
  displayedMessage: null,
  setDisplayedMessage: () => {}
});

function App() {
  const [displayedMessage, setDisplayedMessage] = useState<Message | null>(null);
  const contextValue = { displayedMessage, setDisplayedMessage };

  return (
    <main className={styles.App}>
      <AppContext.Provider value={contextValue}>
        <Logo />
        <Proportion />
        <MessageOverlay />
      </AppContext.Provider>
    </main>
  );
}

export default App;
