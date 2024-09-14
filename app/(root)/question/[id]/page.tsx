import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.actions";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: any) => {
  const { userId } = auth();
  const questionId = params.id;

  const [result, user] = await Promise.all([
    getQuestionById({ questionId }),
    getUserById({ userId }),
  ]);

  const question = {
    author: {
      clerkId: result.author.clerkId,
      name: result.author.name,
      picture: result.author.picture,
    },
    title: result.title,
    createdAt: result.createdAt,
    content: result.content,
    tags: result.tags,
    _id: result._id.toString(),
    upvotes: result.upvotes,
    downvotes: result.downvotes,
    views: result.views,
    answers: result.answers,
  };

  const currentUser = {
    _id: user._id.toString(),
    saved: user.saved,
  };

  return (
    <div className="flex-start w-full flex-col">
      <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <Link
          href={`/profile/${question.author.clerkId}`}
          className="flex items-center gap-2"
        >
          <Image
            src={question.author.picture}
            alt={question.author.name}
            width={22}
            height={22}
            className="rounded-full"
          />
          <p className="paragraph-semibold text-dark300_light700">
            {question.author.name}
          </p>
        </Link>
        <Votes
          type={"question"}
          itemId={questionId.toString()}
          userId={currentUser._id.toString()}
          upvotes={question.upvotes.length}
          downvotes={question.downvotes.length}
          hasUpvoted={question.upvotes.includes(currentUser._id.toString())}
          hasDownvoted={question.downvotes.includes(currentUser._id.toString())}
          hasSaved={currentUser.saved.includes(question._id.toString())}
        />
      </div>
      <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
        {question.title}
      </h2>
      <div className="flex-start mb-8 mt-5 w-full flex-wrap gap-4">
        <Metric
          imageUrl="/assets/icons/clock.svg"
          alt="user"
          value={""}
          title={`Asked ${getTimestamp(question.createdAt)}`}
          textStyles="body-medium text-dark400_light800"
        />
        <Metric
          imageUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imageUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatAndDivideNumber(question.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={question.content} />
      <div className="flex-start mt-8 w-full flex-wrap gap-2 divide-x">
        {question.tags.map((tag: any) => (
          <RenderTag key={tag._id.toString()} title={tag.name} />
        ))}
      </div>
      <div className="my-8 h-px w-full bg-slate-300 dark:bg-slate-700" />
      <AllAnswers
        user={currentUser}
        questionId={question._id.toString()}
        totalAnswers={question.answers.length}
      />
      {userId && (
        <Answer
          questionId={question._id.toString()}
          userId={currentUser._id.toString()}
        />
      )}
    </div>
  );
};

export default page;
