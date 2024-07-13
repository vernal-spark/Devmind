import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/home/QuestionCard";
import Filter from "@/components/shared/Filter/Filter";
import NoResult from "@/components/shared/NoResult";
import Search from "@/components/shared/Search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";
import React from "react";

const questions = [
  {
    id: "1",
    title: "Velit sit ex elit do id dolor occaecat et.",
    tags: [
      { id: 1, name: "js" },
      { id: 2, name: "js" },
    ],
    author: "lorem ipsum",
    upVotes: 10,
    views: 2,
    answers: 2,
    createdAt: new Date(),
  },
];
const page = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px]  px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
        />
        <Filter
          filters={HomePageFilters}
          containerClassName="hidden max-md:flex"
          className="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upVotes={question.upVotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title={"There's no question to show"}
            description={"Ask a Question and kickstart the discussion"}
            link={"/"}
            linkTitle={"Ask a Question"}
          />
        )}
      </div>
    </>
  );
};

export default page;
