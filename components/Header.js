import { useState, useEffect } from "react";
import Link from "next/link";
import Navmenu from "./Navmenu";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PlusIcon } from "@heroicons/react/outline";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <header
        className="sticky top-0 z-50 border-b-2 border-gray-100 dark:border-antiqueBlue-700 w-screen bg-white
      dark:bg-antiqueBlue-900
      "
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="w-full py-3 flex flex-wrap items-center justify-between border-b border-antiqueBlue-500 lg:border-none">
            <div className="flex items-center">
              <ThemeToggle />
              <Link href="/">
                <a className="ml-3">web3rsvp</a>
              </Link>
            </div>
            <div className="ml-10 space-x-4 flex items-center">
              <Link href="/create-event">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-100 transition-all hover:bg-antiqueBlue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500">
                  <PlusIcon className="w-4 mr-2" /> Event
                </a>
              </Link>
              {account ? (
                <Navmenu account={account} disconnect={() => disconnect()} />
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
        </nav>
      </header>
    )
  );
}