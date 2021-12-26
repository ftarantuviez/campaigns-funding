import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum) {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/a5baeec841194a21bcfc8e0182e77504"
  );
  web3 = new Web3(provider);
}

export default web3;
