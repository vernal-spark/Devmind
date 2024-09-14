import Image from "next/image";
import Link from "next/link";
import { getAnswers } from "@/lib/actions/answer.action";
import React from "react";
import ParseHTML from "./ParseHTML";
import { getTimestamp } from "@/lib/utils";
import Filter from "./Filter/Filter";
import { AnswerFilters } from "@/constants/filter";

interface Props {
  user: any;
  questionId: string;
  totalAnswers: number;
}
const AllAnswers = async ({ user, questionId, totalAnswers }: Props) => {
  const answers = await getAnswers({ questionId });

  return (
    <div className="flex-start w-full flex-col">
      <div className="flex-between w-full">
        <p className="paragraph-regular text-primary-500">
          {totalAnswers} Answers
        </p>
        {totalAnswers > 0 && <Filter filters={AnswerFilters} />}
      </div>
      <div className="my-8 h-px w-full bg-slate-300 dark:bg-slate-700" />
      {answers?.map((answer) => (
        <>
          <div
            key={answer._id.toString()}
            className="flex-start w-full flex-col"
          >
            <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={answer.author.picture}
                  alt={answer.author.name}
                  width={22}
                  height={22}
                  className="rounded-full"
                />
                <p className="paragraph-semibold text-dark300_light700 flex items-center gap-1">
                  {answer.author.name}
                  <span className="size-[5px] rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="body-regular text-light400_light500">
                    Asked {getTimestamp(answer.createdAt)}
                  </span>
                </p>
              </Link>
              <div className="flex justify-end">
                {/* <Votes
                  type={"question"}
                  itemId={questionId}
                  userId={user._id}
                  upvotes={answer.upvotes.length}
                  downvotes={answer.downvotes.length}
                  hasUpvoted={answer.upvotes.includes(user._id)}
                  hasDownvoted={answer.upvotes.includes(user._id)}
                  hasSaved={user.saved.includes(user._id)}
                /> */}
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </div>
          <div className="my-8 h-px w-full bg-slate-300 dark:bg-slate-700" />
        </>
      ))}
    </div>
  );
};

export default AllAnswers;
