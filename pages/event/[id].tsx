import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import client from "../../apollo-client";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import connectContract from "../../utils/connectContract";
import formatTimestamp from "../../utils/formatTimestamp";
import Alert from "../../components/Alert";
import {
  EmojiHappyIcon,
  TicketIcon,
  UsersIcon,
  LinkIcon,
} from "@heroicons/react/outline";
import truncateAddress from "../../utils/truncateAddress";
import { EVENT_QUERY } from "../../graphql/events/getEvent";
import { checkNetwork } from "../../helpers/network";
import Button from "../../components/shared/Button";
import { BtnTypes } from "../../utils/btnTypeClasses";
import { TxnModal } from "../../components/shared/TxnModal";
import { TxnStatusType } from "../../providers/TransactionProvider";
import { useWalletCxt } from "../../providers/WagmiProvider";

function Event({ event }) {
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const { TxnStatus, setTxnStatus } = useWalletCxt();

  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [currentTimestamp, _] = useState(new Date().getTime());

  function checkIfAlreadyRSVPed() {
    if (account) {
      for (let i = 0; i < event.rsvps.length; i++) {
        const thisAccount = account.address.toLowerCase();
        if (event.rsvps[i].attendee.id.toLowerCase() == thisAccount) {
          return true;
        }
      }
    }
    return false;
  }

  const newRSVP = async () => {
    setTxnStatus(TxnStatusType.AWAITING_CONFIRMATION);
    try {
      const rsvpContract = connectContract();

      if (rsvpContract) {
        const txn = await rsvpContract.createNewRSVP(event.id, {
          value: event.deposit,
          gasLimit: 300000,
        });
        setLoading(true);
        setTxnStatus(TxnStatusType.PENDING);
        console.log("Minting...", txn.hash);

        await txn.wait();
        console.log("Minted -- ", txn.hash);
        setTxnStatus(TxnStatusType.DONE);
        setSuccess(true);
        setLoading(false);
        setMessage("Your RSVP has been created successfully.");
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      if (error.code === 4001) {
        setTxnStatus(TxnStatusType.REJECTED);
      }
      setSuccess(false);
      setMessage("Error!");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{event.name} | web3rsvp</title>
        <meta name="description" content={event.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {TxnStatus !== TxnStatusType.DEFAULT &&
        <TxnModal title="Your RSVP has been created successfully." href={`/event/${event.id}`} />
      }
      <section className="relative py-12">
        {loading && (
          <Alert
            alertType={"loading"}
            alertBody={"Please wait"}
            triggerAlert={true}
            color={"white"}
          />
        )}
        {success && (
          <Alert
            alertType={"success"}
            alertBody={message}
            triggerAlert={true}
            color={"palegreen"}
          />
        )}
        {success === false && (
          <Alert
            alertType={"failed"}
            alertBody={message}
            triggerAlert={true}
            color={"palevioletred"}
          />
        )}
        <h6 className="mb-2">{formatTimestamp(event.eventTimestamp)}</h6>
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl mb-6 lg:mb-12">
          {event.name}
        </h1>
        <div className="flex flex-wrap-reverse lg:flex-nowrap">
          <div className="w-full pr-0 lg:pr-24 xl:pr-32">
            <div className="mb-8 w-full aspect-w-10 aspect-h-5 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-antiqueBlue-500 overflow-hidden">
              {event.imageURL && (
                <Image src={event.imageURL} alt="event image" layout="fill" />
              )}
            </div>
            <p className="whitespace-pre-line">{event.description}</p>
          </div>
          <div className="max-w-xs w-full flex flex-col gap-4 mb-6 lg:mb-0">
            {event.eventTimestamp > currentTimestamp ? (
              account && checkNetwork(activeChain.id) ? (
                checkIfAlreadyRSVPed() ? (
                  <>
                    <span className="w-full text-center px-6 py-3 text-base font-medium rounded-full text-teal-800 bg-teal-100">
                      You have RSVPed! 🙌
                    </span>
                    <div className="flex item-center">
                      <LinkIcon className="w-6 mr-2 text-antiqueBlue-800" />
                      <a
                        className="text-antiqueBlue-800 truncate hover:underline"
                        href={event.link}
                      >
                        {event.link}
                      </a>
                    </div>
                  </>
                ) : (
                  <Button btnType={BtnTypes.OUTLINE}
                    onClick={newRSVP}
                  >
                    RSVP for {ethers.utils.formatEther(event.deposit)} MATIC
                  </Button>
                )
              ) : (
                <ConnectButton />
              )
            ) : (
              <Button btnType={BtnTypes.SUBMIT} disabled>
                Event has ended
              </Button>

            )}
            <>
              <div className="flex item-center">
                <UsersIcon className="w-6 mr-2" />
                <span className="truncate">{event.totalRSVPs}/{event.maxCapacity} attending</span>
              </div>
              <div className="flex item-center">
                <TicketIcon className="w-6 mr-2" />
                <span className="truncate">1 RSVP per wallet</span>
              </div>
              <div className="flex items-center">
                <EmojiHappyIcon className="w-6 mr-2" />
                <span className="truncate">
                  Hosted by{" "}
                  <a
                    className="text-antiqueBlue-800 truncate hover:underline dark:text-antiqueBlue-400"
                    href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}address/${event.eventOwner}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {truncateAddress(event.eventOwner)}
                  </a>
                </span>
              </div>
            </>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Event;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data } = await client.query({
    query: EVENT_QUERY,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      event: data.event,
    },
  };
}

export const config = {
  unstable_excludeFiles: ["public/**/*"],
};
