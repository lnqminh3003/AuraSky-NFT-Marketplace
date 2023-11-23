import createKeccakHash from "keccak";
import { KeyboardEvent, useEffect,  useState } from "react";
import WalletConnect from "../pages/home/components/walletConnect";
import Link from "next/link";
import Account from "../pages/home/components/account";
import GetMoney from "../pages/home/components/getMoney";
import Router, { useRouter } from "next/router";
import web3 from "../helpers/connectMetamask/web3";

declare let window: any;

const NavigationBar = (searchQuery: any) => {
  const router = useRouter();
  // console.log("searching ", searchQuery["searchQuery"]);

  const [searchValue, setSearchValue] = useState(
    searchQuery["searchQuery"] == undefined
      ? undefined
      : searchQuery["searchQuery"]
  );
  const [isSearching, setIsSearching] = useState(false);
  const [isDropOpen, setDrop] = useState({
    explore: false,
    profile: false,
    wallet: false,
  });

  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [connectMessage, setConnectMessage] = useState("Connect with MetaMask");
  const [showModal, setShowModal] = useState(false);
  const [modalMetamask, setModalMetamask] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("account") != "") {
      ConnectToMetamask();
    }
  }, []);

  const ConnectToMetamask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any[]) => {
          localStorage.setItem("account", toChecksumAddress(result[0]));
          setDefaultAccount(toChecksumAddress(result[0]));
          accountChangeHandler(result);
        });
    } else {
      setModalMetamask(true);
      console.log("Install Metamask");
    }
  };

  function toChecksumAddress(address: string) {
    address = address.toLowerCase().replace("0x", "");
    var hash = createKeccakHash("keccak256").update(address).digest("hex");
    var ret = "0x";

    for (var i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase();
      } else {
        ret += address[i];
      }
    }

    return ret;
  }