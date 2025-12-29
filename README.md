Decentralized Crowdfunding dApp

A blockchain-based crowdfunding platform that allows anyone to create fundraising campaigns and receive contributions directly from users’ wallets. Campaign logic is enforced on-chain, ensuring transparency, fairness, and trust without intermediaries.

Inspired by Kickstarter, but powered by smart contracts.

✨ Features

🔐 Wallet-based authentication

🏗️ Create crowdfunding campaigns

💰 Donate to campaigns using crypto

⏱️ Goal & deadline-based funding

🔒 Trustless withdrawals

↩️ Automatic refunds for failed campaigns

📊 Real-time funding progress

📜 Fully on-chain campaign data

🧠 How It Works
1. Create a Campaign

A user creates a campaign by providing:

Title

Description

Funding goal

Deadline

The campaign is stored on-chain via a smart contract.

2. Donate

Other users can:

Browse active campaigns

Contribute funds before the deadline

Track funding progress in real time

3. Campaign Resolution

After the deadline:

✅ If the funding goal is met → the creator can withdraw the funds

❌ If the goal is not met → donors can claim refunds

All rules are enforced by the smart contract.

🔗 Smart Contract Overview

The smart contract handles:

Campaign creation

Donations

Withdrawal conditions

Refund logic

Event emission for frontend updates

Core Functions

createCampaign

donateToCampaign

withdraw

refund

🖥️ Frontend Overview

The frontend provides a clean and intuitive interface for interacting with the smart contract.

Pages

Landing Page – Intro & wallet connection

Campaigns List – Browse all campaigns

Create Campaign – Campaign creation form

Campaign Detail – Donate, view progress, withdraw/refund

🛠️ Tech Stack
Smart Contracts

Solidity (or Clarity if built on Stacks)

Frontend

Next.js

TailwindCSS

Wallet connection library (RainbowKit / Stacks.js)

Blockchain data provider (Hiro API / Ethers RPC)

🎯 Use Cases

Startup fundraising

Community projects

Open-source funding

Personal causes

Creative projects

🚀 Optional Enhancements

NFT rewards for donors

Campaign categories

Leaderboard for top contributors

Social sharing links

Minimum and maximum contribution limits

🧪 Development
Run Locally
npm install
npm run dev

Requirements

Node.js

Crypto wallet (MetaMask, Leather, Xverse)

Testnet or Mainnet access

🔒 Design Philosophy

This project removes centralized control from crowdfunding by enforcing trust through smart contracts. Funds move only according to predefined rules, ensuring fairness for both creators and contributors.

📄 License

MIT License