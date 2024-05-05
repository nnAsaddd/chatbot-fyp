"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { sessionRatingType } from "@/utils/types";
import { sessionRatingAction } from "@/utils/actions";
import toast from "react-hot-toast";
import ratings from "@/utils/rating";

const Ratings = () => {
  const userName = localStorage.getItem("userName") as string;
  const [currentRating, setCurrentRating] = useState<number>(10);

  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: (values: sessionRatingType) => sessionRatingAction(values),
    onSuccess: (data: sessionRatingType | { error: string }) => {
      if ("error" in data) {
        toast.error(data?.error);
        // router.push("/login");
        return;
      }
      toast.success("Rating saved successfully!!!");
      // form.reset();
      router.push("/dashboard");
    },
  });

  const handleSubmit = () => {
    const values = {
      userName,
      rating: currentRating,
    };
    mutate(values);
  };
  return (
    <main className="max-w-3xl flex flex-col">
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {ratings?.map((rating) => {
          return (
            <button
              key={rating.id}
              className={`max-w-64 rounded-xl border-[1px] px-8 xl:px-12 py-3 transition-all ${
                currentRating === rating.rating
                  ? "text-blue-600 border-blue-600"
                  : "text-text-color-900 border-text-color-900"
              }`}
              onClick={() => setCurrentRating(rating.rating)}
            >
              {rating.title}
            </button>
          );
        })}
      </ul>
      <button
        className="self-center mt-8 max-w-56 rounded-xl capitalize px-8 xl:px-16 py-2 hover:bg-custom-btn-500 transition-all bg-custom-btn-900"
        onClick={handleSubmit}
      >
        Save
      </button>
    </main>
  );
};
export default Ratings;
