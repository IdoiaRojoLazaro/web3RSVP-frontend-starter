import Layout from "../components/Layout";
import "../styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { WalletProvider } from "../providers/WagmiProvider";
import { MAIN_CHAIN } from "../constants";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const { chains, provider, webSocketProvider } = configureChains(
  [MAIN_CHAIN],
  [infuraProvider({ infuraId }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "web3rsvp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});


export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={client}>
          <WalletProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WalletProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
