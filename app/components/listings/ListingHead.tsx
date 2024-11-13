"use client";

"use client";

import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types";
import React, { FC } from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

type Props = {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
};

const ListingHead: FC<Props> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  // Default image URL in case no imageSrc is provided
  const defaultImageUrl = "/images/logo.png"; // Adjust this to your default image path

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc || defaultImageUrl} // Use default image if no imageSrc is provided
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
