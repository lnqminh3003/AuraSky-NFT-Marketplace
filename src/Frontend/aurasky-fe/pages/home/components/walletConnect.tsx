import { KeyboardEvent, useEffect, useState } from "react";
import web3 from "../../../helpers/connectMetamask/web3";
import { utils } from "ethers";
import createKeccakHash from "keccak";

declare let window: any;

const WalletConnect = () => {
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
