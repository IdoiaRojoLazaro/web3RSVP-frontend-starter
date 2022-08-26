import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export const ConnectWalletSection = () => {
  return (
    <div className="flex flex-col items-center py-8">
      <p className="mb-4">Please connect your wallet to view your rsvps</p>
      <ConnectButton />
    </div>
  );
};
