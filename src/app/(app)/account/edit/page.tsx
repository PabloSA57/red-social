import React from "react";
import { cookies } from "next/headers";
import UserService from "@/app/services/user";
import FormEdit from "../../components/form-edit";
import { createClient } from "@/app/utils/supabase/server";

export const dynamic = "force-dynamic";
const page = async () => {
  const supabase = createClient();
  const userService = new UserService(supabase);

  const { data, error } = await userService.getUser();

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-white dark:bg-black z-50 md:relative md:z-0">
      <FormEdit user={data!} />
    </div>
  );
};

export default page;
