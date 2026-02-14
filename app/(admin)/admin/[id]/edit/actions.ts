'use server';

import { getTOTP } from "@/logic/auth.api";
import { updateEntry } from "@/logic/db.api";
import { revalidatePath } from "next/cache";

export async function handleSubmit(data: FormData, auth_code: string, id: string) {
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

    await updateEntry(id, title, markdown);
    revalidatePath("/admin");
    revalidatePath(`/${id}`);
}
