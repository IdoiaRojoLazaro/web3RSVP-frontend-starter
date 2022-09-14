import Link from 'next/link';
import React, { useState } from 'react';
import { btnTypeClasses, BtnTypes } from '../../utils/btnTypeClasses';
import connectContract from "../../utils/connectContract";
import DragAndDropComp from '../forms/DragAndDropComp';
import { Input } from '../forms/Input';
import { InputContainer } from '../forms/InputContainer';
import { InputGroup } from '../forms/InputGroup';
import { Label } from '../forms/Label';
import Button from '../shared/Button';
import { ethers } from "ethers";
import { TxnStatusType, useWalletCxt } from '../../providers/WagmiProvider';
import { storeImage } from '../../utils/StorageClient';
import getRandomImage from '../../utils/getRandomImage';

export const FormCreateEvent = ({ setEventID }: { setEventID: React.Dispatch<React.SetStateAction<number | null>> }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [refund, setRefund] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventImage, setEventImage] = useState<any>("");
  const [eventDescription, setEventDescription] = useState("");
  const { setTxnStatus } = useWalletCxt();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const imageURL = await uploadImage();
    setTxnStatus(TxnStatusType.AWAITING_CONFIRMATION);
    const body = {
      name: eventName,
      description: eventDescription,
      link: eventLink,
      image: getRandomImage(),
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
        setTxnStatus(TxnStatusType.ERROR);
      } else {
        let responseJSON = await response.json();
        await createEvent(responseJSON.cid);
      }
    } catch (error) {
      setTxnStatus(TxnStatusType.ERROR);
      // alert(
      //   `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      // );
    }
  }

  const uploadImage = async () => {
    const imageURI = await storeImage(eventImage, eventImage.name);
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
        setTxnStatus(TxnStatusType.PENDING);
        //setMessage("Minting ...");
        let wait = await txn.wait();
        //setMessage("Minted ...");

        setEventID(wait.events[0].args[0]);
        setTxnStatus(TxnStatusType.DONE);
        //setMessage("Your event has been created successfully.");
        //setSuccess(true);
        setLoading(false);
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      //setSuccess(false);
      setTxnStatus(TxnStatusType.ERROR);
      //setMessage(`There was an error creating your event: ${error.message}`);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
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
                      dark:text-antiqueBlue-900
                      dark:focus:border-antiqueBlue-100
                      "
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </InputContainer>
        </InputGroup>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link href="/">
            <a className={btnTypeClasses(BtnTypes.CANCEL)}>Cancel</a>
          </Link>
          <Button className="ml-[10px]" btnType={BtnTypes.SUBMIT} type="submit" disabled={loading}>Create</Button>
        </div>
      </div>
    </form>
  )
}
