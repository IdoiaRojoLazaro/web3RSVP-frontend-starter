import React, { createContext, useContext, useState } from "react";

export enum TxnStatusType {
  DEFAULT = '[Txn status] Default',
  AWAITING_CONFIRMATION = '[Txn status] Awaiting confirmation from user',
  PENDING = '[Txn status] Pending',
  DONE = '[Txn status] Done',
  REJECTED = '[Txn status] Rejected',
  ERROR = '[Txn status] Error'
}

interface TxnContextInterface {
  TxnStatus: TxnStatusType;
  setTxnStatus: React.Dispatch<React.SetStateAction<TxnStatusType>>;
}

export const TxnContext = createContext<TxnContextInterface | undefined>(undefined);


function TxnProvider({ children }: { children: React.ReactNode }) {
  const [TxnStatus, setTxnStatus] = useState<TxnStatusType>(TxnStatusType.DEFAULT);

  return (
    <TxnContext.Provider value={{
      TxnStatus,
      setTxnStatus
    }
    }>
      {children}
    </TxnContext.Provider>
  );
};

function useTxn() {
  const context = useContext(TxnContext);
  if (context === undefined) {
    throw new Error('useTxn must be used within a TxnProvider');
  }
  return context;
}

export { TxnProvider, useTxn }