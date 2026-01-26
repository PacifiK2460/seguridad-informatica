import { getEntries } from "@/logic/db.api";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Card, Container, Flex, Heading, Table, Text, TextField } from "@radix-ui/themes";
import Form from 'next/form'
import Link from "next/link";
import ThemeButton from "../components/ThemeButton";

export default async function AdminPage(
    // Get props from "query" parameter
    { searchParams }: { searchParams: { query?: string } }
) {
    const params = await searchParams;
    const entriesQuery = params.query || "";
    console.log("entriesQuery: ", entriesQuery);
    const entries = await getEntries(entriesQuery);

    return (
        <Container p="5" className="w-full">
            <Flex direction="column" gap="2" className="w-full">
                <Heading>
                    Panel de Administración
                </Heading>
                <Text>
                    Debido a lo pequeña que es la aplicación, todo mundo puede ver el contenido
                    del panel de administración. Solo aquellos que cuenten con el codigo TOTP
                    podrán guardar o modificar contenido.
                </Text>

                <Flex className="w-full" gap="2">
                    <ThemeButton variant="outline" />

                    <Form action={"/admin"} className="w-full">
                        <TextField.Root placeholder="Buscar contenido…" className="w-full" name="query">
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>
                    </Form>

                    <Link href="/admin/new">
                        <Button type="button" className="w-full">
                            Agregar
                            <PlusIcon />
                        </Button>
                    </Link>
                </Flex>

                <Flex className="w-full" direction="column" gap="2">
                    {
                        entries.length === 0 ? (
                            <Flex direction="column" gap="1">
                                <Text as="div" size="2" color="gray">
                                    No se encontraron entradas.
                                </Text>
                            </Flex>
                        ) : (
                            entries.map((entry) => (
                                // TODO: Edit Page, Delete Entry
                                <Card asChild className="w-full" key={entry.id}>
                                    <Link href={`/admin/${entry.id}`} className="w-full">
                                        <Text as="div" size="2" weight="bold">
                                            {entry.title}
                                        </Text>
                                        <Text as="div" color="gray" size="2">
                                            {entry.id}
                                        </Text>
                                    </Link>
                                </Card>
                            ))
                        )
                    }
                </Flex>

            </Flex>
        </Container>
    )
}