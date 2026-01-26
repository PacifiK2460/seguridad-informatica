"use client";
import { Flex, Heading, Text, Box, Button, TextField, TextArea } from "@radix-ui/themes";
import { toast } from "sonner";
import { sendThankYouEmail } from "./actions";

export default function ContactForm() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("_replyto") as string;
        const user_message = formData.get("message") as string;
        const subject = `¡Gracias por contactarme, ${name}!`;

        try {
            await sendThankYouEmail(email, name, user_message);
            toast.success("¡Mensaje enviado con éxito!", {
                description: "Revisa tu correo electrónico o la bandeja de SPAM para ver la confirmación.",
            });
        } catch (error) {
            toast.error("Error al enviar el mensaje. Por favor, intenta de nuevo.", {
                description: `Error: ${(error as Error).message}`,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3" my="5">
                <Heading as="h2">
                    Contactame
                </Heading>
                <Text>
                    ¿Tienes alguna pregunta o quieres trabajar conmigo? ¡Envíame un mensaje!
                </Text>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Nombre
                        </Text>
                        <TextField.Root
                            // defaultValue="Freja Johnsen"
                            placeholder="Introduce tu nombre completo"
                            type="text"
                            name="name"
                            required
                        />

                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Email
                        </Text>
                        <TextField.Root
                            // defaultValue="freja@example.com"
                            placeholder="Introduce tu correo electrónico"
                            type="email"
                            name="_replyto"
                            required
                        />

                    </label>

                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Mensaje
                        </Text>
                        <TextArea
                            // defaultValue="Hello! I'm interested in your services."
                            placeholder="Escribe tu mensaje aquí"
                            // type="text"
                            name="message"
                            required
                            // multiline
                            rows={5}
                        />

                    </label>
                    <Button type="submit">
                        Enviar Mensaje
                    </Button>
                </Flex>
            </Flex>
        </form>
    )
}