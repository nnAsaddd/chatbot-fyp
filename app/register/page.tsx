"use client";

import Link from "next/link";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import toast from "react-hot-toast";
import { registerUserAction } from "@/utils/actions";
import { SelectTypeEnum, UserType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: UserType) => registerUserAction(values),
    onSuccess: (data: UserType | { error: string }) => {
      if ("error" in data) {
        toast.error(data?.error);
      } else {
        toast.success("User created successfully!!!");
        queryClient.invalidateQueries({ queryKey: ["users"] });
        // form.reset();
        router.push("/login");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const birth = formData.get("birth") as string;
    const gender = formData.get("gender") as string;
    const mood = "unknown" as string;
    const session = 0 as number;
    const gptResponse = "short";
    const values = {
      firstName,
      lastName,
      userName,
      email,
      password,
      birth,
      gender,
      mood,
      session,
      gptResponse,
    };
    mutate(values);
  };

  return (
    <main className="gradient min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" grid md:grid-cols-2 gap-x-6 gap-y-2"
      >
        {/* First Name */}
        <InputField name="firstName" type="text" />
        {/* Last Name */}
        <InputField name="lastName" type="text" />
        {/* User Name */}
        <InputField name="userName" type="text" />
        {/* Email */}
        <InputField name="email" type="email" />
        {/* Password */}
        <InputField name="password" type="password" />
        {/* Date of Birth */}
        <InputField name="birth" type="date" />
        {/* Gender */}
        <SelectField values={Object.values(SelectTypeEnum)} />
        <button
          className="bg-custom-btn-900 text-white rounded-xl text-lg py-1 hover:bg-custom-btn-hover  hover:scale-95 transition-all"
          disabled={isPending}
        >
          {isPending ? "Please wait..." : "Register"}
        </button>
        <span className="text-text-color-100 text-lg">
          Already have an account?{" "}
          <Link
            href="/login"
            className="ml-2 text-secondary-500 text-custom-input-text"
          >
            Login
          </Link>
        </span>
      </form>
    </main>
  );
};
export default RegisterPage;
