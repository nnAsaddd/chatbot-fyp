"use client";
import { Mic, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { generateResponseAction } from "@/utils/actions";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const ChatResponse = () => {
  const gptResponse = localStorage.getItem("gptResponse");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [countPromts, setCountPromots] = useState<number>(0);

  const { mutate, isPending } = useMutation({
    mutationFn: (query: any) =>
      generateResponseAction({ messages: [...messages, query], gptResponse }),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong!!!");
        return;
      }
      setMessages((prev: any) => [...prev, data]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev: any) => [...prev, query]);
    setText("");
    setCountPromots((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col flex-1 mt-12">
      {/* Chats */}
      <div className="flex flex-col flex-1 justify-center mx-8">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-y-2 h-full">
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`odd:self-end odd:bg-[#61284480] odd:rounded-xl odd:px-4 py-2 even:self-start even:text-text-color-100`}
                >
                  <p className="text-start">{message.content}</p>
                </div>
              );
            })}
            {isPending ? <span className="loading"></span> : null}
          </div>
        ) : (
          <p>
            I understand you're feeling frustrated. <br /> Let's talk calmly and
            work through this together. 🌱
          </p>
        )}
      </div>

      {/* Dialog Box */}
      {countPromts === 10 && text === "" && (
        <Dialog defaultOpen={true}>
          <DialogContent className="bg-gray-400">
            <DialogHeader>
              <DialogTitle>
                How are you feeling now? Do you want to change your mood
                preference?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Link
                href="/dashboard/mood-preferences"
                className="p-2 rounded-lg bg-white text-black hover:cursor-pointer hover:scale-95 transition-all"
              >
                Change Mood
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="w-3/4 mx-auto rounded-2xl px-3 flex items-center chat"
      >
        <span className="mr-2">
          <Mic className="text-text-color-900 w-[1.2rem]" />
        </span>
        <input
          type="text"
          name="inputText"
          placeholder="Send a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full py-2 rounded-2xl chat outline-none placeholder:text-sm"
        />
        <button
          type="submit"
          disabled={isPending || text === ""}
          className="group"
        >
          <Send
            className={`text-text-color-900 w-[1.2rem] hover:scale-105 transition-all group-disabled:text-gray-700`}
          />
        </button>
      </form>
    </div>
  );
};
export default ChatResponse;
