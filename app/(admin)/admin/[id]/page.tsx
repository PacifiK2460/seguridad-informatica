import DeleteEntry from "@/app/components/DeleteEntry";
import { MarkdownRenderer } from "@/app/components/MarkdownRenderer";
import ThemeButton from "@/app/components/ThemeButton";
import { getEntryById } from "@/logic/db.api";
import { ArrowLeftIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Container, Flex, Heading, Text, Button, Card, Code, Box } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminEntryPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const entry = await getEntryById(id);

    if(!entry) {
        notFound();
    }

    return (
        <Container p="5" className="w-full">
            <Flex direction="column" gap="2" className="w-full">
                <Heading>
                    {entry.title}
                </Heading>
                <Code>
                    {entry.id}
                </Code>
                <Flex align="center" justify="between" direction="row" gap="2" className="w-full">
                    <Flex direction="row" gap="2">
                        <ThemeButton variant="outline" />
                        <Link href="/admin">
                            <Button type="button">
                                <ArrowLeftIcon />
                                Volver
                            </Button>
                        </Link>
                    </Flex>
                    <Flex direction="row" gap="2">
                        <DeleteEntry id={id} />

                        <Link href={`/admin/${entry.id}/edit`}>
                            <Button type="button">
                                <Pencil1Icon />
                                Editar
                            </Button>
                        </Link>
                    </Flex>
                </Flex>

                <Flex className="w-full" direction="column" gap="2" mt="5">
                    <Card asChild className="w-full">
                        <Box>
                            <MarkdownRenderer content={entry.content || ""} />
                        </Box>
                    </Card>
                </Flex>
            </Flex>
        </Container>
    );
}