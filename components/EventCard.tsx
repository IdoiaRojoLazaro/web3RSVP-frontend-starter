import Link from "next/link";
import Image from "next/image";
import formatTimestamp from "../utils/formatTimestamp";
import { UsersIcon } from "@heroicons/react/outline";

interface EventCardInterface {
  id: number;
  name: string;
  eventTimestamp: string;
  imageURL: string;
  totalRSVPs: number;
  maxCapacity: number;
}

export default function EventCard({
  id,
  name,
  eventTimestamp,
  imageURL,
  totalRSVPs,
  maxCapacity,
}: EventCardInterface) {
  return (
    <div className="group relative clickable-card rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-antiqueBlue-500 dark:bg-antiqueBlue-800">
      <Link href={`/event/${id}`}>
        <a className="clickable-card__link"></a>
      </Link>
      <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden relative ">
        {imageURL && <Image src={imageURL} alt="event image" layout="fill" />}
      </div>
      <div className="p-5">
        <p className="mt-2 block text-sm text-gray-500 dark:text-antiqueBlue-50">
          {formatTimestamp(eventTimestamp)}
        </p>
        <p className="block text-base font-medium text-gray-900 dark:text-antiqueBlue-50">{name}</p>
        <p className="text-base font-medium text-gray-900 dark:text-antiqueBlue-50 flex">
          <UsersIcon className="w-4 mr-2" />
          {totalRSVPs} / {maxCapacity}
        </p>
      </div>
    </div>
  );
}
