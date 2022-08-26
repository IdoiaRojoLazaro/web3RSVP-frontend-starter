# Web3RSVP-frontend

### Fork and clone the repo from Github to work with it locally

This repo contains an event management and creation dapp (kind of web3-native Eventbrite dapp).

## Technology used to created it:

- Filecoin & IPFS
- The Graph
- Radicle
- Infura
- Polygon
- Lens

## Diagram:

1. Web3RSVP Contract - Solidity, deployed to Polygon Mumbai Testnet
2. Subgraph

- to get data about our contract from Polygon Mumbai
- to get event details and image URL from IPFS

2. Infura - To allow us to request transactions apporval
3. Web3.Storage / IPFS - To store the event details and image with Web3.Storage
4. Ethers.js - To call functions from the contract
5. Rainbowkit / wagmi - To connect to Coinbase Wallet
6. Coinbase Wallet - To login the user and approvers or rejects transactions
7. Frontend App - React

- To show event details and actions that the user can do

## Workflow

1. User creates event

- time of the event, to know when refunds should become available
- max capacity of attendees
- deposit amount for the event
-

## Smart contract

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
