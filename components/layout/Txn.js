import React from "react";

export const Txn = ({ children }) => {
  return (
    <div className="fixed z-10 flex flex-col w-screen h-screen items-center justify-center top-0 left-0 bg-slate-100 bg-opacity-80 index">
      <div className="max-w-md text-center bg-white p-8 rounded-md shadow-xl">
        {children}
      </div>
    </div>
  );
};
