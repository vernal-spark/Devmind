import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import React from "react";

interface Props {
  filters: { name: string; value: string }[];
  className?: string;
  containerClassName?: string;
}

const Filter = ({ filters, className, containerClassName }: Props) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <Select>
        <SelectTrigger
          className={`${className} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light800_dark300">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="text-dark500_light700 cursor-pointer"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
