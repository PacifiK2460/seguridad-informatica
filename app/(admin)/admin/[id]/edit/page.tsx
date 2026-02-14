'use client';

import { AlertDialog, Button, Container, Flex, Heading, Spinner, Text, TextField } from "@radix-ui/themes";
import Form from "next/form";
import { ForwardRefEditor } from "@/app/components/MDXEDitor/ForwardRefEditor";
import { handleSubmit } from "./actions";
import { useState, useEffect } from "react";
import ThemeButton from "@/app/components/ThemeButton";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useRouter, useParams } from 'next/navigation'
import { getEntryById } from "@/logic/db.api";


export default function EditContent() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [auth_code, setAuthCode] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        async function fetchEntry() {
            try {
                const entry = await getEntryById(id);
                if (!entry) {
                    toast.error("Contenido no encontrado");
                    router.push('/admin');
                    return;
                }

                setTitle(entry.title || "");
                setContent(entry.content || "");
            } catch (error) {
                toast.error("Error al cargar el contenido", {
                    description: `Error: ${(error as Error).message}`,
                });
            } finally {
                setLoading(false);
            }
        }
        fetchEntry();
        setLoading(false);
    }, [id]);


    async function handleSubmitWrapper() {
        try {
            const formElement = document.querySelector('form') as HTMLFormElement;
            const formData = new FormData(formElement);
            await handleSubmit(formData, auth_code, id);
            toast.success("Contenido actualizado con éxito!");
            setDialogOpen(false);
            setAuthCode("");
            router.push('/admin')
        } catch (error) {
            toast.error("Error al actualizar el contenido. Por favor, intenta de nuevo.", {
                description: `Error: ${(error as Error).message}`,
            });
        }
    }

    return loading ? (
        <Flex direction="column" align="center" justify="center" className="w-full h-64">
            <Spinner />
            <Text>Cargando...</Text>
        </Flex>
    ) : (
        <Container p="5" className="w-full">
            <form onSubmit={(e) => e.preventDefault()}>
                <Flex direction="column" gap="2" className="w-full">
                    <Flex align="center" className="w-full" gap="2">
                        <Link href="/admin">
                            <Button type="button" variant="soft" className="w-full">
                                <ArrowLeftIcon />
                                Regresar
                            </Button>
                        </Link>
                        <ThemeButton variant="outline" />
                        <Heading className="w-full">
                            <input
                                className="w-full"
                                required
                                name="title"
                                placeholder="Titulo del Contenido"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Heading>
                    </Flex>

                    <textarea
                        hidden
                        name="markdown"
                        value={content}
                        readOnly
                    />

                    <Flex direction="column" gap="4" className="w-full">
                        <ForwardRefEditor
                            markdown={content}
                            contentEditableClassName="prose dark:prose-invert w-full max-w-none"
                            className="w-full"
                            onChange={(markdown) => {
                                setContent(markdown);
                            }}
                        />
                        <AlertDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                            <AlertDialog.Trigger>
                                <Button type="button">Publicar</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Authenticate</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Escribe el codigo que aparece en tu app de autenticación.
                                </AlertDialog.Description>

                                <TextField.Root
                                    className="my-2"
                                    placeholder="Código de autenticación"
                                    type="text"
                                    name="auth_code"
                                    value={auth_code}
                                    onChange={(e) => setAuthCode(e.target.value)}
                                    required
                                />

                                <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">
                                            Cancelar
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button variant="solid"
                                            onClick={handleSubmitWrapper}
                                        >
                                            Autenticar
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>

                        {/* <Button type="submit">
                            Publicar
                        </Button> */}
                    </Flex>
                </Flex>
            </form>
        </Container>
    );
}