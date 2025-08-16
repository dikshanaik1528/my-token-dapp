import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import token from "./deployments/localhost/MyToken.json"; // ✅ deployed ABI + address

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [balance, setBalance] = useState("");

  // ✅ use the deployed contract address from JSON
  const contractAddress = token.address;

  // Connect MetaMask
  async function connectWallet() {
    try {
      const ethereum = window.ethereum;
      if (!ethereum) throw new Error("MetaMask not found");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      const _provider = new BrowserProvider(ethereum);
      const _signer = await _provider.getSigner();

      setProvider(_provider);
      setSigner(_signer);
    } catch (err) {
      console.error("❌ Wallet connection error:", err);
    }
  }

  // Init contract
  async function initContract(_signer) {
    try {
      console.log("⚙️ Initializing contract with address:", contractAddress);
      console.log("📄 ABI loaded:", token.abi);

      const _contract = new Contract(contractAddress, token.abi, _signer);
      setContract(_contract);

      // Fetch token details
      const name = await _contract.name();
      const symbol = await _contract.symbol();
      const bal = await _contract.balanceOf(await _signer.getAddress());

      setTokenName(name);
      setTokenSymbol(symbol);
      setBalance(bal.toString());
    } catch (err) {
      console.error("❌ Contract init error:", err);
    }
  }

  useEffect(() => {
    if (signer) {
      initContract(signer);
    }
  }, [signer]);

  return (
    <div>
      <h1>ERC20 Token DApp</h1>
      <button onClick={connectWallet} disabled={!!account}>
        {account ? "Wallet Connected" : "Connect Wallet"}
      </button>
      <p>Connected account: {account}</p>

      {contract && (
        <div>
          <p>
            Token: {tokenName} ({tokenSymbol})
          </p>
          <p>Balance: {balance}</p>
        </div>
      )}
    </div>
  );
}
