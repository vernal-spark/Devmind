import { Badge } from "@/components/ui/badge";
import React from "react";

const RenderTag = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <Badge
      className={`subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase ${className}`}
    >
      {title}
    </Badge>
  );
};

export default RenderTag;
