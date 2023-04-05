import React from "react";
import { useLocalStorage } from './useLocalStorage';

const syncAccount = () => {
const [account, setaccount] = useLocalStorage("account", "0x0");

  React.useEffect(() => {
    if (!window.ethereum) {
      // Nothing to do here... no ethereum provider found
      return;
    }
    const accountWasChanged = accounts => {
      setaccount(accounts[0]);
      console.log("accountWasChanged", account);
    };
    const getAndSetAccount = async () => {
      const changedAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setaccount(changedAccounts[0]);
      console.log("getAndSetAccount", account);
    };
    const clearAccount = () => {
      setaccount("0x0");
      console.log("clearAccount", account);
    };
    window.ethereum.on("accountsChanged", accountWasChanged);
    window.ethereum.on("connect", getAndSetAccount);
    window.ethereum.on("disconnect", clearAccount);
    window.ethereum.request({ method: "eth_requestAccounts" }).then(
      accounts => {
        console.log("accounts[0]", accounts[0]);
        // No need to set account here, it will be set by the event listener
      },
      error => {
        // Handle any UI for errors here, e.g. network error, rejected request, etc.
        // Set state as needed
      }
    );
    return () => {
      // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
      window.ethereum.on("accountsChanged", accountWasChanged);
      window.ethereum.on("connect", getAndSetAccount);
      window.ethereum.on("disconnect", clearAccount);
    };
  }, [
    account // re-render when this state changes
  ]);
  return account;
}

export default syncAccount
