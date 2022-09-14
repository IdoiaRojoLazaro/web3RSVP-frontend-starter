import Header from "./Header";
import Footer from "./Footer";
import React, { useEffect } from "react";
import { NetworkBanner } from "./NetworkBanner";
import { useWalletCxt } from "../providers/WagmiProvider";
import { checkNetwork } from "../helpers/network";
import { useAccount, useNetwork } from "wagmi";

const Layout = ({ children }: React.ComponentPropsWithoutRef<"div">) => {
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();

  return (
    <div className="font-serif flex flex-col min-h-screen">
      <Header />
      <main className="relative flex-1">
        {/* {activeChain && !checkNetwork(activeChain?.id) && (
          <NetworkBanner />
        )} */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
