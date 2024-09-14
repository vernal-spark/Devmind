"use server";
import { revalidatePath } from "next/cache";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { Answer } from "@/database/answer.model";
import Question from "@/database/question.model";
import User from "@/database/users.model";

export async function createAnswer(params: CreateAnswerParams) {
  const { content, author, question, path } = params;
  try {
    console.log(typeof content);
    await Answer.create({ content, author, question });
    await Question.findOneAndUpdate(
      { _id: question },
      { $push: { answers: "669d3398b2e460994655f7b9" } }
    );
    revalidatePath(path);
  } catch (err) {
    console.error(err);
  } finally {
    // redirect(path);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    const { questionId, sortBy, page, pageSize } = params;

    const answers = await Answer.find()
      .where("question")
      .equals(questionId)
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return answers;
  } catch (err) {
    console.error(err);
  }
}
