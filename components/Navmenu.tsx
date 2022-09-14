import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import joinClassNames from "../utils/joinClassNames";
import truncateAddress from "../utils/truncateAddress";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/outline";
import { GetAccountResult } from "@wagmi/core";
import { useRouter } from "next/router";
import { PREFIX_MY_EVENTS_ROUTES, PREFIX_MY_RSVPS_ROUTES } from "../constants/routes";

export default function Navmenu({ account, disconnect }: { account: GetAccountResult; disconnect: () => void }) {
  const router = useRouter();
  const menuItemClasses = "block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-antiqueBlue-700 cursor-pointer";
  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <div>
        <Menu.Button className="px-[6px] flex items-center transition-all hover:bg-antiqueBlue-50 rounded-md dark:hover:bg-antiqueBlue-800">
          <div className="p-[4px] border items-center justify-center text-center rounded-full bg-antiqueBlue-100 border-antiqueBlue-100 bg-transparent border-transparent dark:text-white dark:hover:bg-antiqueBlue-700">
            <UserIcon className="w-[16px] h-[16px] text-center text-antiqueBlue-800 dark:text-antiqueBlue-50" />
          </div>
          <p className="p-2 flex items-center">
            {truncateAddress(account.address)}{" "}
            <ChevronDownIcon className="w-4 h-4 ml-2" />{" "}
          </p>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-antiqueBlue-800">
          <div className="py-1">
            <Menu.Item>
              <a
                href={`/my-rsvps/upcoming`}
                className={joinClassNames(
                  menuItemClasses,
                  router.pathname.includes(PREFIX_MY_RSVPS_ROUTES) ? "border-l-4 border-antiqueBlue-700" : "border-b-0",
                )}
              >
                My RSVPs
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href={`/my-events/upcoming`}
                className={joinClassNames(
                  menuItemClasses,
                  router.pathname.includes(PREFIX_MY_EVENTS_ROUTES) ? "border-l-4 border-antiqueBlue-700" : "border-b-0"
                )}
              >
                My Events
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={disconnect}
                className={menuItemClasses}
              >
                Log Out
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
