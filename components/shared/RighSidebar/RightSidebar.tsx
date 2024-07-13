import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag/RenderTag";

const questions = [
  {
    id: 1,
    title:
      "lorem ipsum dolor sit amet lorem ipsum lorem ipsum dolor sit amet lorem ipsum",
  },
  { id: 2, title: "lorem ipsum dolor sit amet" },
  { id: 3, title: "lorem ipsum dolor sit amet" },
  { id: 4, title: "lorem ipsum dolor sit amet" },
  { id: 5, title: "lorem ipsum dolor sit amet" },
];

const tags = [
  { id: 1, title: "javaScript", no: 5 },
  { id: 2, title: "javaScript", no: 5 },
  { id: 3, title: "javaScript", no: 5 },
  { id: 4, title: "javaScript", no: 5 },
  { id: 5, title: "javaScript", no: 5 },
];

const RightSidebar = () => {
  return (
    <div className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-lg:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions.map((question) => (
            <Link
              href="/"
              key={question.id}
              className="flex cursor-pointer items-center justify-between"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron"
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-14">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {tags.map((tag) => (
            <Link
              href="/"
              key={tag.id}
              className="flex cursor-pointer items-center justify-between"
            >
              <RenderTag title={tag.title} />
              <p className="small-medium text-dark500_light700">{tag.no}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
