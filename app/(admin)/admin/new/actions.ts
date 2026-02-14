'use server';

import { getTOTP } from "@/logic/auth.api";
import { createEntry } from "@/logic/db.api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleSubmit(data: FormData, auth_code: string) {
    const auth = getTOTP().validate({
        token: auth_code,
        window: 1
    })
    console.log("Auth validation result: ", auth)
    
    if (auth === null) {
        throw new Error("Codigo invalido")
    }
    
    // Handle form submission logic here
    console.log("Data: ", data);
    const title = data.get("title") as string;
    const markdown = data.get("markdown") as string;

    await createEntry(title, markdown);
    revalidatePath("/admin");
}