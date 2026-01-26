'use server';
import { sendMail, THANK_YOU_TEMPLATE } from "@/logic/mail.api";
export async function sendThankYouEmail(
    to: string,
    name: string,
    user_message: string
) {
    const subject = `¡Gracias por contactarme, ${name}!`;
    const emailMessage = THANK_YOU_TEMPLATE(name, user_message);
    await sendMail(to, subject, emailMessage);
}