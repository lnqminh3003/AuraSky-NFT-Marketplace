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

    const ConnectToMetamask = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            await window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((result: any[]) => {
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