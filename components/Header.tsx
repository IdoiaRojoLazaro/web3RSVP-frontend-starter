import { useState, useEffect } from "react";
import Link from "next/link";
import Navmenu from "./Navmenu";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PlusIcon } from "@heroicons/react/outline";
import { ThemeToggle } from "./ThemeToggle";
import { NEW_EVENT_ROUTE } from "../constants/routes";
import Button from "./shared/Button";
import { BtnTypes } from "../utils/btnTypeClasses";

export default function Header() {
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);
  const { data: account, isLoading } = useAccount();

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
          <div className="w-full py-3 flex flex-wrap items-center justify-between ">
            <div className="flex items-center">
              <ThemeToggle />
              <Link href="/">
                <a className="ml-3">EventWeb3Brite</a>
              </Link>
            </div>
            <div className="ml-10 space-x-4 flex items-center">
              <Link href={NEW_EVENT_ROUTE} >
                <Button btnType={BtnTypes.OUTLINE}>
                  <PlusIcon className="w-4 mr-2" /> Event
                </Button>
              </Link>
              {isLoading &&
                <Button btnType={BtnTypes.OUTLINE} className="animate-pulse" disabled>
                  Connecting...
                </Button>

              }
              {!account ? (
                <ConnectButton />
              ) : (
                <Navmenu account={account} disconnect={() => disconnect()} />
              )}
            </div>
          </div>
        </nav>
      </header>
    )
  );
}
