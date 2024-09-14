import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter/Filter";
import Search from "@/components/shared/Search/LocalSearch";
import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/actions/user.actions";
import Link from "next/link";
import React from "react";

const page = async () => {
  const result = await getAllUsers({});

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All User</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
        />
        <Filter
          filters={UserFilters}
          className="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result?.users && result?.users?.length > 0 ? (
          result?.users.map((user) => (
            <UserCard key={user._id.toString()} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet...</p>
            <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
              Join to be first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default page;
