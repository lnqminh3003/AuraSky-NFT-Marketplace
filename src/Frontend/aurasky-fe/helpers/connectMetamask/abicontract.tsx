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
  