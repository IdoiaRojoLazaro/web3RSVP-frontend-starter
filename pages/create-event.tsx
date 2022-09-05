import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import Alert from "../components/Alert";
import connectContract from "../utils/connectContract";
import { ConnectWalletSection } from "../components/shared/ConnectWalletSection";
import { LoadingTxn } from "../components/shared/LoadingTxn";
import { SuccessTxn } from "../components/shared/SuccessTxn";
import { Label } from "../components/forms/Label";
import { InputGroup } from "../components/forms/InputGroup";
import { Input } from "../components/forms/Input";
import { InputContainer } from "../components/forms/InputContainer";
import DragAndDropComp from "../components/forms/DragAndDropComp";
import { storeImage } from "../utils/storageClient";
import Button from "../components/shared/Button";
import { btnTypeClasses } from "../utils/btnTypeClasses";

export default function CreateEvent() {
  const { data: account } = useAccount();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [refund, setRefund] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventImage, setEventImage] = useState<any>("");
  const [eventDescription, setEventDescription] = useState("");

  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [eventID, setEventID] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("Uploading image ...");
    const imageURL = await uploadImage();
    setMessage("Connecting wallet ...");
    console.log(eventImage);
    const body = {
      name: eventName,
      description: eventDescription,
      link: eventLink,
      // image: getRandomImage(),
      imageIPFS: `${imageURL}/${eventImage.name}`,
    };

    try {
      console.log(body);
      const response = await fetch("/api/store-event-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        alert("Oops! Something went wrong. Please refresh and try again.");
      } else {
        console.log("Form successfully submitted!");
        let responseJSON = await response.json();
        await createEvent(responseJSON.cid);
      }
      // check response, if success is false, don't take them to success page
    } catch (error) {
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  }

  const uploadImage = async () => {
    const imageURI = await storeImage(eventImage, eventImage.name);
    console.log(imageURI);
    return imageURI.cid;
  };

  const createEvent = async (cid) => {
    try {
      const rsvpContract = connectContract();

      if (rsvpContract) {
        let deposit = ethers.utils.parseEther(refund);
        let eventDateAndTime = new Date(`${eventDate} ${eventTime}`);
        let eventTimestamp = eventDateAndTime.getTime();
        let eventDataCID = cid;

        const txn = await rsvpContract.createNewEvent(
          eventTimestamp,
          deposit,
          maxCapacity,
          eventDataCID,
          { gasLimit: 900000 }
        );
        console.log("txn", txn);

        setLoading(true);
        setMessage("Minting ...");
        let wait = await txn.wait();
        setMessage("Minted ...");

        setEventID(wait.events[0].args[0]);
        setMessage("Your event has been created successfully.");
        setSuccess(true);
        setLoading(false);
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      setSuccess(false);
      setMessage(`There was an error creating your event: ${error.message}`);
      setLoading(false);
      console.log(error);
    }
  };

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
      {!account ? (
        <ConnectWalletSection />
      ) : (
        <section className="relative py-12 max-w-3xl m-auto">
          {loading && <LoadingTxn message={message} />}
          {success && (
            <SuccessTxn
              title="You can check your event in the your event page. It could take some minutes to show"
              href={eventID ? `/event/${eventID}` : "/my-events/upcoming"}
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

          <>
            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-4 dark:text-antiqueBlue-50">
              Create your virtual event
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 divide-y divide-gray-200"
            >
              <div className="space-y-6 sm:space-y-5 ">
                <InputGroup>
                  <Label htmlFor="eventname">Event name</Label>
                  <InputContainer>
                    <Input
                      id="event-name"
                      name="event-name"
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </InputContainer>
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="date" description="Your event date and time">
                    Date & time
                  </Label>
                  <InputContainer className="flex gap-2">
                    <div className="w-1/2">
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        min={new Date().toISOString().slice(0, -14)}
                      />
                      {/* <input
                        id="date"
                        name="date"
                        type="date"
                        className="max-w-lg block focus:ring-antiqueBlue-500 focus:border-antiqueBlue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        min={new Date().toISOString().slice(0, -14)}
                      /> */}
                    </div>
                    <div className="w-1/2">
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        required
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                      {/* <input
                        id="time"
                        name="time"
                        type="time"
                        className="max-w-lg block focus:ring-antiqueBlue-500 focus:border-antiqueBlue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                        required
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      /> */}
                    </div>
                  </InputContainer>
                </InputGroup>

                <InputGroup>
                  <Label
                    htmlFor="max-capacity"
                    description="Limit the number of spots available for your event."
                  >
                    Max capacity
                  </Label>
                  <InputContainer>
                    <Input
                      type="number"
                      name="max-capacity"
                      id="max-capacity"
                      min="1"
                      placeholder="100"
                      value={maxCapacity}
                      onChange={(e) => setMaxCapacity(e.target.value)}
                    />
                  </InputContainer>
                </InputGroup>

                <InputGroup>
                  <Label
                    htmlFor="refundable-deposit"
                    description="Require a refundable deposit (in MATIC) to reserve one spot at your event"
                  >
                    Refundable deposit
                  </Label>
                  <InputContainer>
                    <Input
                      type="number"
                      name="refundable-deposit"
                      id="refundable-deposit"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={refund}
                      onChange={(e) => setRefund(e.target.value)}
                    />
                  </InputContainer>
                </InputGroup>

                <InputGroup>
                  <Label
                    htmlFor="event-link"
                    description="The link for your virtual event"
                  >
                    Event link
                  </Label>
                  <InputContainer>
                    <Input
                      id="event-link"
                      name="event-link"
                      type="text"
                      value={eventLink}
                      onChange={(e) => setEventLink(e.target.value)}
                    />
                  </InputContainer>
                </InputGroup>

                <InputGroup>
                  <Label
                    htmlFor="event-image"
                    description="The image for your virtual event"
                  >
                    Event image
                  </Label>
                  <InputContainer>
                    <DragAndDropComp setFile={setEventImage} />
                  </InputContainer>
                </InputGroup>

                <InputGroup>
                  <Label
                    htmlFor="about"
                    description="Let people know what your event is about!"
                  >
                    Event description
                  </Label>
                  <InputContainer>
                    <textarea
                      id="about"
                      name="about"
                      rows={10}
                      className="max-w-lg shadow-sm block w-full 
                      focus:ring-antiqueBlue-500 focus:border-antiqueBlue-500 
                      sm:text-sm border border-gray-300 rounded-md
                      placeholder:text-antiqueBlue-600
                      dark:focus:text-antiqueBlue-900"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                    />
                  </InputContainer>
                </InputGroup>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <Link href="/">
                    <a className={btnTypeClasses("cancel")}>Cancel</a>
                  </Link>
                  <Button type="submit">Create</Button>
                </div>
              </div>
            </form>
          </>
        </section>
      )}
    </div>
  );
}
