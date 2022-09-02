import Link from "next/link";
import React from "react";
import { Txn } from "../layout/Txn";

export const SuccessTxn = ({ title, href }) => {
  return (
    <Txn>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="192"
        height="192"
        fill="#8FA6B4"
        viewBox="0 0 256 256"
        className="m-auto text-antiqueBlue-700"
      >
        <rect width="256" height="256" fill="none"></rect>
        <polyline
          points="172 104 113.3 160 84 132"
          fill="none"
          stroke="#8FA6B4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        ></polyline>
        <circle
          cx="128"
          cy="128"
          r="96"
          fill="none"
          stroke="#8FA6B4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        ></circle>
      </svg>
      <h1 className="text-3xl tracking-tight font-extrabold text-antiqueBlue-800 sm:text-4xl mb-4">
        Success!
      </h1>
      <h2 className="text-antiqueBlue-700 mb-4">{title}</h2>

      <Link href={href} passHref>
        <button
          className="p-2 border-2 rounded-md 
          border-transparent text-antiqueBlue-700 bg-antiqueBlue-100 
          hover:bg-antiqueBlue-500 hover:text-white 
          transition-all"
        >
          Perfect!
        </button>
      </Link>
    </Txn>
  );
};
