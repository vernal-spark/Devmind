"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface Props {
  route: string;
  iconPosition: "left" | "right";
  placeholder: string;
  imgSrc: string;
  className?: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  placeholder,
  imgSrc,
  className,
}: Props) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] w-full grow items-center gap-4 rounded-[10px] px-4 ${className}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        className="paragraph-regular no-focus placeholder border-none bg-transparent shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
