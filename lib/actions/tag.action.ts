"use server";

import Tag from "@/database/tags.model";
import { GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/users.model";

export async function getTopInteractedTags(params: any) {
  try {
    //   const tags = Tag.find({});
    const { userId } = params;
    const user = User.find({ _id: userId });
    if (!user) {
      throw new Error("No user found");
    }
    return ["tag1", "tag2", "tag3"];
  } catch (e) {
    console.error(e);
  }
}
