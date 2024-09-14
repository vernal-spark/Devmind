"use client";
import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useTheme } from "@/context/ThemeProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../ui/button";
import { AnswerSchema } from "@/lib/validation";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";

const Answer = ({
  questionId,
  userId,
}: {
  questionId: string;
  userId: string;
}) => {
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer.toString(),
        author: userId,
        question: questionId,
        path: `/question/${questionId}`,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex-start w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="flex-between max-sm:flex-col max-sm:gap-8">
                  <p className="flex-start paragraph-semibold text-dark400_light800 max-sm:w-full">
                    Write your answer here
                  </p>
                  <Button className="background-light800_dark400 w-fit gap-1 self-end px-8 !text-light-900 max-sm:w-full">
                    <Image
                      src={"/assets/icons/stars.svg"}
                      alt={""}
                      width={16}
                      height={16}
                    />
                    <div className="bg-gradient-to-r text-primary-500">
                      Generate AI Answer
                    </div>
                  </Button>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey="dlphka1zc49pcfc6a4kr00stfv6sopuae88hurwje7m2fg17"
                    // @ts-ignore
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist ",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                    initialValue=""
                    onEditorChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient w-fit self-end px-8 !text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Answer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
