# 🚀 React Hardhat DApp

This is a decentralized application (DApp) built with **React**, **Ethers.js v6**, **Hardhat**, and **MetaMask**.
It connects to a local Hardhat blockchain running at `localhost:8545`, allowing you to deploy and interact with smart contracts.

---

## 📂 Project Structure

```
/my-dapp
 ├── /contracts       # Solidity smart contracts
 ├── /scripts         # Deployment and interaction scripts
 ├── /frontend        # React app (your DApp frontend)
 │    ├── App.jsx
 │    ├── abi/        # Contract ABI JSON files
 │    └── ...
 ├── hardhat.config.js
 ├── package.json
 └── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/my-dapp.git
cd my-dapp
```

### 2. Install Dependencies

For Hardhat (root folder):

```bash
npm install
```

For React frontend (inside `/frontend`):

```bash
cd frontend
npm install
```

---

## 🛠 Running the Project

### 1. Start Local Hardhat Node

In one terminal:

```bash
npx hardhat node
```

This will start a local blockchain at `http://127.0.0.1:8545`.

### 2. Deploy Smart Contract

In another terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

This will deploy your contract and print its address.
👉 Copy the deployed contract address and paste it into **`App.jsx`** where `0xYourContractAddressHere` is used.

### 3. Run the Frontend (React App)

Inside `/frontend`:

```bash
npm run dev
```

Your app will run at `http://localhost:5173` (Vite default).

---

## 🔗 MetaMask Setup

1. Open MetaMask → Networks → **Add Network** → **Localhost 8545**.
2. Import private keys from Hardhat accounts (printed in terminal when running `npx hardhat node`).
3. Connect MetaMask to `localhost:8545`.

---

## 🖥 Features

* ✅ Connect to MetaMask
* ✅ Show connected wallet address
* ✅ Deploy & interact with local Hardhat contracts
* ✅ Uses **Ethers.js v6** with `BrowserProvider`

---

## 📜 Example Logs in Browser Console

When running the app, you’ll see logs like:

```
🔗 Requesting MetaMask accounts...
✅ MetaMask connected, accounts: [...]
📡 Provider set: BrowserProvider {}
✍️ Signer set: 0xYourWalletAddress
⚙️ Initializing contract with address: 0xDeployedContractAddress
```

---

## 📌 Notes

* Make sure Hardhat node is running before opening the frontend.
* Update `App.jsx` with the deployed **contract address** and **ABI**.
* If you see `formatJson` error, it means ABI or contract import is incorrect.

---

## 📝 License

MIT License. Free to use and modify.

