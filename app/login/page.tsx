"use client";

import Link from "next/link";
import InputField from "@/components/InputField";
import toast from "react-hot-toast";
import { loginUserAction } from "@/utils/actions";
import { UserLoginType, UserType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: UserLoginType) => loginUserAction(values),
    onSuccess: (data: UserType | { error: string }) => {
      if ("error" in data) {
        toast.error(data?.error);
        return;
      }

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("mood", data.mood);
      localStorage.setItem("session", data.session.toString());
      localStorage.setItem("gptResponse", data.gptResponse);

      queryClient.invalidateQueries({ queryKey: ["users"] });
      // form.reset();
      if (data.mood === "unknown" || data.session === 0) {
        toast.success("User logged in successfully!!!");
        router.push("/mood");
        return;
      }
      toast.success(`You are currently in ${data.mood} mood`);
      toast.success("User logged in successfully!!!");
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;
    const values = {
      userName,
      password,
    };
    mutate(values);
  };

  return (
    <main className="gradient min-h-screen flex justify-center items-center">
      <form className=" grid gap-x-6 gap-y-2" onSubmit={handleSubmit}>
        {/* User Name */}
        <InputField name="userName" type="text" />
        {/* Password */}
        <InputField name="password" type="password" />

        <button
          className="bg-custom-btn-900 text-white rounded-xl text-lg py-1 hover:bg-custom-btn-hover hover:scale-95 transition-all"
          disabled={isPending}
        >
          <span>{isPending ? "Please wait..." : "Login"}</span>
        </button>
        <span className="text-text-color-100 text-lg">
          Don't have an account?
          <Link
            href="/register"
            className="ml-2 text-secondary-500 text-custom-input-text"
          >
            Register
          </Link>
        </span>
      </form>
    </main>
  );
};
export default LoginPage;
