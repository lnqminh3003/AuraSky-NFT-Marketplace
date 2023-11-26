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
  
  const accountChangeHandler = async (newAccount: any) => {
    var tmp = toChecksumAddress(newAccount[0]);
    setDefaultAccount(tmp);
    localStorage.setItem("account", tmp);
    console.log(localStorage.getItem("account"));

    var balanceInWei = await web3.eth.getBalance(newAccount.toString());
    var balance = await web3.utils.fromWei(balanceInWei, "ether");
    setUserBalance(balance);
    localStorage.setItem("balance", balance);
    setConnectMessage("Connected Successful");
    
  };
  

  const handleClickDropdown = (val: string) =>
    setDrop({
      ...isDropOpen,
      [val]: !isDropOpen[val as keyof typeof isDropOpen],
    });
  // const {explore, profile} = isDropOpen

  function handleSearchBox(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      console.log(searchValue);
      router.push({ pathname: "./find", query: { query: searchValue } });
    }
  }
  
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="p-2 bg-gradient-to-r from-cyan-500 via-teal-300 to-rose-300">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
          >
            <img
              src="https://i.imgur.com/98gX8Ky.png"
              className="h-6 mr-3 sm:h-9"
            />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-slate-800">
              AuraSky
            </span>
          </Link>
          {/* Search bar */}
          <div className="flex items-center relative mx-auto text-gray-600 w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={`${isSearching ? 2.5 : 1.5}`}
              stroke="currentColor"
              className={`w-6 h-6 ${
                isSearching ? "text-blue-600" : "text-gray-700"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <input
              id="search_box"
              onKeyDown={handleSearchBox}
              className="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ml-2 border-gray-200 bg-white h-10 px-5 rounded-2xl text-sm w-full"
              type="search"
              name="search"
              placeholder="Search items"
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              value={searchValue}
            />
          </div>
          {/* Menu Items */}
          <div className="flex space-x-2 items-center">
            {/* By text */}
            <div className="flex items-center space-x-6 bg-slate-200 p-1 px-2 rounded-xl">
              {defaultAccount != "" &&
              <Link
                href="/create"
                className="block text-gray-700 rounded font-semibold hover:text-sky-600 hover:font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.3}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
              }
              {defaultAccount == "" &&
                <button onClick ={()=>{setShowModal(true)}}>
                  <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.3}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
                </button>
                
              }

              {/* By icon */}
              {/* Account */}
              {defaultAccount != "" &&  <Account address={"profile"} nft={"1"} />}
              {defaultAccount == "" &&  
                 <button onClick ={()=>{setShowModal(true)}}>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.3}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                 </button>
              }
             
              {/* Wallet */}
              <div>
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="block text-gray-700 hover:text-sky-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.3}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>
        </button>

        {showModal ? (
          <>
            <div className=" bg-black bg-opacity-60 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-300 outline-none focus:outline-none">
                  <div className=" flex items-start p-5 border-solid border-slate-200 rounded-t">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                      className="p-1 rounded h-11 w-11"
                      alt="..."
                    />
                    <h3 className="pl-2 text-4xl font-bold whitespace-nowrap dark:text-white">
                      Wallet
                    </h3>
                  </div>

                  <div className="relative p-6 flex-auto items-center">
                    {defaultAccount == "" && (
                      <button
                        onClick={ConnectToMetamask}
                        type="button"
                        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-16 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                      >
                        {" "}
                        <svg
                          aria-hidden="true"
                          className="mr-2 -ml-1 w-6 h-5"
                          viewBox="0 0 2405 2501"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <g clip-path="url(#clip0_1512_1323)">
                            {" "}
                            <path
                              d="M2278.79 1730.86L2133.62 2221.69L1848.64 2143.76L2278.79 1730.86Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1848.64 2143.76L2123.51 1767.15L2278.79 1730.86L1848.64 2143.76Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2065.2 1360.79L2278.79 1730.86L2123.51 1767.15L2065.2 1360.79ZM2065.2 1360.79L2202.64 1265.6L2278.79 1730.86L2065.2 1360.79Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1890.29 1081.17L2285.34 919.338L2265.7 1007.99L1890.29 1081.17ZM2253.21 1114.48L1890.29 1081.17L2265.7 1007.99L2253.21 1114.48Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2253.21 1114.48L2202.64 1265.6L1890.29 1081.17L2253.21 1114.48ZM2332.34 956.82L2265.7 1007.99L2285.34 919.338L2332.34 956.82ZM2253.21 1114.48L2265.7 1007.99L2318.65 1052.01L2253.21 1114.48Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1542.24 2024.17L1641 2055.7L1848.64 2143.75L1542.24 2024.17Z"
                              fill="#E2761B"
                              stroke="#E2761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2202.64 1265.6L2253.21 1114.48L2296.64 1147.8L2202.64 1265.6ZM2202.64 1265.6L1792.71 1130.55L1890.29 1081.17L2202.64 1265.6Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1987.86 617.696L1890.29 1081.17L1792.71 1130.55L1987.86 617.696Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2285.34 919.338L1890.29 1081.17L1987.86 617.696L2285.34 919.338Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}