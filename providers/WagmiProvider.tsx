import React, { createContext, useContext, useState } from "react";

export enum TxnStatusType {
  DEFAULT = '[Txn status] Default',
  AWAITING_CONFIRMATION = '[Txn status] Awaiting confirmation from user',
  PENDING = '[Txn status] Pending',
  DONE = '[Txn status] Done',
  REJECTED = '[Txn status] Rejected',
  ERROR = '[Txn status] Error'
}

interface WalletContextInterface {
  TxnStatus: TxnStatusType;
  setTxnStatus: React.Dispatch<React.SetStateAction<TxnStatusType>>;
}

export const WalletContext = createContext<WalletContextInterface | undefined>(undefined);


function WalletProvider({ children }: { children: React.ReactNode }) {
  const [TxnStatus, setTxnStatus] = useState<TxnStatusType>(TxnStatusType.DEFAULT);

  return (
    <WalletContext.Provider value={{
      TxnStatus,
      setTxnStatus
    }
    }>
      {children}
    </WalletContext.Provider>
  );
};

function useWalletCxt() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletCxt must be used within a WalletProvider');
  }
  return context;
}

export { WalletProvider, useWalletCxt }