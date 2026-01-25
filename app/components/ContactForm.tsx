import { Flex, Heading, Text, Box, Button, TextField, TextArea } from "@radix-ui/themes";
import Form from "next/form"

export default function ContactForm() {
    async function handleSubmit(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;
        const email = formData.get("_replyto") as string;
        const message = formData.get("message") as string;

        // First we get the access token, TO BE IMPLEMENTED
        const rest_client = "https://accounts.zoho.com/oauth/v2/token";
        const client_id = process.env.ZOHO_SELF_CLIENT_ID;
        const redirect_uri = "localhost:3000";
        const scope = "ZohoMail.accounts.READ"
        const code = process.env.ZOHO_SELF_CLIENT_CODE;
        const client_secret = process.env.ZOHO_SELF_CLIENT_SECRET;
        const user_id = process.env.ZOHO_USER_ID;

        const response = await fetch(`${rest_client}?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}`, {
            method: "POST",
        });

        const data = await response.json();
        console.log("token_response_data", data);

    }

    return (
        <Form action={handleSubmit}>
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
        </Form>
    )
}