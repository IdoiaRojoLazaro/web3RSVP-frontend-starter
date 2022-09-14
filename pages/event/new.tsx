import { useEffect, useState } from "react";
import Head from "next/head";
import { useAccount, useNetwork } from "wagmi";
import { ConnectWalletSection } from "../../components/shared/ConnectWalletSection";
import { FormCreateEvent } from "../../components/event/FormCreateEvent";
import { TxnModal } from "../../components/shared/TxnModal";
import { TxnStatusType, useWalletCxt } from "../../providers/WagmiProvider";
import { checkNetwork } from "../../helpers/network";

export default function New() {
  const { data: address } = useAccount();
  const { activeChain } = useNetwork();
  const { TxnStatus } = useWalletCxt();
  const [eventID, setEventID] = useState<number | null>(null);

  useEffect(() => {
    // disable scroll on <input> elements of type number
    document.addEventListener("wheel", (_) => {
      const element = (document.activeElement as HTMLInputElement);
      if (element.type === "number") {
        (document.activeElement as HTMLElement).blur();
      }
    });
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Create your event | web3rsvp</title>
        <meta
          name="description"
          content="Create your virtual event on the blockchain"
        />
      </Head>
      {!address || !checkNetwork(activeChain.id) ? (
        <ConnectWalletSection />
      ) : (
        <section className="relative py-12 max-w-3xl m-auto">
          {TxnStatus !== TxnStatusType.DEFAULT && (
            <TxnModal title={eventID ? "You can now check the event!" : 'You can check your event in "My events" page. Remember that it could take some minutes to show'}
              href={eventID ? `/event/${eventID}` : "/my-events/upcoming"} />
          )}
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-4 dark:text-antiqueBlue-50">
            Create your virtual event
          </h1>
          <FormCreateEvent setEventID={setEventID} />
        </section>
      )}
    </div>
  );
}
