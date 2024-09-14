"use client";
import Image from "next/image";
import React from "react";

interface Props {
  type: "question" | "answers";
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasSaved: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpvoted,
  hasDownvoted,
  hasSaved,
}: Props) => {
  return (
    <div className="flex items-center gap-4 max-sm:justify-end">
      <div className="flex-center cursor-pointer gap-1">
        <Image
          src={
            hasUpvoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          alt="upvotes"
          width={20}
          height={20}
        />
        <p className="background-light700_dark400 text-dark100_light900 small-regular p-1 ">
          {upvotes}
        </p>
      </div>
      <div className="flex-center cursor-pointer gap-1">
        <Image
          src={
            hasDownvoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          alt="upvotes"
          width={20}
          height={20}
        />
        <p className="background-light700_dark400 text-dark100_light900 small-regular p-1 ">
          {downvotes}
        </p>
      </div>
      {type === "question" && (
        <div className="flex-center cursor-pointer gap-1">
          <Image
            src={
              hasSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
            alt="upvotes"
            width={20}
            height={20}
          />
        </div>
      )}
    </div>
  );
};

export default Votes;
