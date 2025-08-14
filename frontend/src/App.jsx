import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import abi from "./abi/MyToken.json";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState("");
  const [contractAddress, setContractAddress] = useState(import.meta.env.VITE_CONTRACT_ADDRESS || "");
  const [contract, setContract] = useState(null);

  const [name, setName] = useState("-");
  const [symbol, setSymbol] = useState("-");
  const [decimals, setDecimals] = useState(18);
  const [totalSupply, setTotalSupply] = useState("-");
  const [balance, setBalance] = useState("-");

  const [mintTo, setMintTo] = useState("");
  const [mintAmount, setMintAmount] = useState("10");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("1");
  const [status, setStatus] = useState("");

  async function connect() {
    if (!window.ethereum) return alert("MetaMask not found");
    const _provider = new BrowserProvider(window.ethereum);
    await _provider.send("eth_requestAccounts", []);
    const _signer = await _provider.getSigner();
    setProvider(_provider);
    setSigner(_signer);
    setAccount(await _signer.getAddress());
  }

  function loadContract(addr) {
    try {
      const c = new Contract(addr, abi, signer || provider);
      setContract(c);
      setContractAddress(addr);
      setStatus("Contract loaded.");
    } catch (e) {
      console.error(e);
      setStatus("Invalid contract address or ABI.");
    }
  }

  async function refresh() {
    if (!contract) return;
    try {
      const [n, s, d, ts, bal] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
        contract.balanceOf(account)
      ]);
      setName(n);
      setSymbol(s);
      setDecimals(Number(d));
      setTotalSupply(formatUnits(ts, d));
      setBalance(formatUnits(bal, d));
    } catch (e) {
      console.error(e);
      setStatus("Failed to read contract state.");
    }
  }

  async function doMint() {
    if (!contract || !signer) return alert("Connect wallet and load contract");
    try {
      setStatus("Minting...");
      const cSigner = contract.connect(signer);
      const tx = await cSigner.mint(mintTo || account, parseUnits(mintAmount, decimals));
      await tx.wait();
      setStatus("Minted!");
      await refresh();
    } catch (e) {
      console.error(e);
      setStatus("Mint failed.");
    }
  }

  async function doTransfer() {
    if (!contract || !signer) return alert("Connect wallet and load contract");
    try {
      setStatus("Transferring...");
      const cSigner = contract.connect(signer);
      const tx = await cSigner.transfer(transferTo, parseUnits(transferAmount, decimals));
      await tx.wait();
      setStatus("Transfer complete!");
      await refresh();
    } catch (e) {
      console.error(e);
      setStatus("Transfer failed.");
    }
  }

  useEffect(() => {
    if (contract && account) refresh();
  }, [contract, account]);

  return (
    <div style={{ maxWidth: 680, margin: "2rem auto", fontFamily: "system-ui, Arial" }}>
      <h1>🪙 Diksha Token DApp</h1>

      <section style={{ marginBottom: "1rem" }}>
        <button onClick={connect}>Connect MetaMask</button>
        <div style={{ marginTop: 8 }}>
          <strong>Account:</strong> {account || "(not connected)"}
        </div>
      </section>

      <section style={{ marginBottom: "1rem" }}>
        <input
          style={{ width: "70%" }}
          placeholder="Contract address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <button onClick={() => loadContract(contractAddress)} style={{ marginLeft: 8 }}>
          Load Contract
        </button>
      </section>

      <section style={{ padding: 12, border: "1px solid #ddd", borderRadius: 12, marginBottom: "1rem" }}>
        <h3>Token Info</h3>
        <div><strong>Name:</strong> {name}</div>
        <div><strong>Symbol:</strong> {symbol}</div>
        <div><strong>Decimals:</strong> {decimals}</div>
        <div><strong>Total Supply:</strong> {totalSupply} {symbol}</div>
        <div><strong>Your Balance:</strong> {balance} {symbol}</div>
        <button onClick={refresh} style={{ marginTop: 8 }}>Refresh</button>
      </section>

      <section style={{ padding: 12, border: "1px solid #ddd", borderRadius: 12, marginBottom: "1rem" }}>
        <h3>Mint</h3>
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Recipient (leave empty to mint to self)"
          value={mintTo}
          onChange={(e) => setMintTo(e.target.value)}
        />
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Amount (e.g., 10)"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
        />
        <button onClick={doMint}>Mint</button>
      </section>

      <section style={{ padding: 12, border: "1px solid #ddd", borderRadius: 12 }}>
        <h3>Transfer</h3>
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Recipient"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
        />
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Amount (e.g., 1)"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button onClick={doTransfer}>Transfer</button>
      </section>

      <p style={{ marginTop: 16, color: "#555" }}>{status}</p>
      <hr />
      <small>Tip: paste ABI JSON into <code>src/abi/MyToken.json</code> and set <code>VITE_CONTRACT_ADDRESS</code> in <code>.env</code> (optional).</small>
    </div>
  );
}
