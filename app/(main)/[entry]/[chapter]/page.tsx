import { getEntryById } from "@/logic/db.api";
import { Badge, Button, Card, Em, Flex, Heading, Separator, Text, ScrollArea } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/app/components/MarkdownRenderer";
import { parseChapters } from "@/logic/chapter.utils";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon } from "@radix-ui/react-icons";
// import { fromMarkdown } from 'react-markdown-toc'
import { TOC } from 'react-markdown-toc/server'
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/collapsible";
import { ContentTOC } from "@/app/components/ContentTOC";


export default async function EntryPage({
  params,
}: {
  params: Promise<{ entry: string; chapter: string }>
}) {
  const entryParams = await params;

  const entryID = entryParams.entry || null;

  if (!entryID) {
    notFound();
  }

  const entry = await getEntryById(entryID);

  if (!entry) {
    notFound();
  }

  const chapterTitleURL = entryParams.chapter;

  const chapterTitle = decodeURIComponent(chapterTitleURL || '');

  const chapters = entry.content ? parseChapters(entry.content) : [];

  const chapterIndex = chapters.findIndex((c) => c.title === chapterTitle);

  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = chapters[chapterIndex];

  const previousChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  const content = `## ${chapter.title} \n\n ${chapter.content}`;


  return (
    <Flex direction={{
      initial: "column-reverse",
      md: "row"
    }} justify="center" align="stretch" gap="2" width="100%" >
      <Card className="w-full" >

        <Flex direction="column" justify="center" align="start" gap="2" width="100%">
          <Flex direction="row-reverse" justify="start" align="center" gap="2">
            <Heading>
              <Em>
                {entry.title}
              </Em>

            </Heading>
            <Badge>
              {entry.id}
            </Badge>
          </Flex>

          {chapter.content ? (
            <Flex direction="column" gap="4" width="100%">
              {/* <Flex direction="row" justify="between" align="center" width="100%">
                {chapter.title && (
                  <Heading size="6" as="h1">
                    {chapter.title}
                  </Heading>
                )}
              </Flex> */}
              <MarkdownRenderer content={content} />
            </Flex>
          ) : (
            <Text size="1" color="gray">
              Esta entrada no tiene contenido. Puedes editarla para agregar información relevante.
            </Text>
          )
          }

          <Flex justify="between" gap="2" width="100%">
            {previousChapter ? (
              <Link href={`/${entry.id}/${encodeURIComponent(previousChapter.title)}`} className="w-full">
                <Card>
                  <Flex direction="row" align="center" gap="2">
                    <ArrowLeftIcon />
                    <Flex direction="column" gap="1">
                      <Text size="1" color="gray">
                        Capítulo anterior
                      </Text>
                      <Text size="2" weight="bold">
                        {previousChapter.title || "Sin título"}
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            ) : null
            }

            {nextChapter ? (
              <Link href={`/${entry.id}/${encodeURIComponent(nextChapter.title)}`} className="w-full">
                <Card>
                  <Flex direction="row" align="center" gap="2">
                    <Flex direction="column" gap="1" ml="auto">
                      <Text size="1" color="gray">
                        Siguiente capítulo
                      </Text>
                      <Text size="2" weight="bold">
                        {nextChapter.title || "Sin título"}
                      </Text>
                    </Flex>
                    <ArrowRightIcon />
                  </Flex>
                </Card>
              </Link>
            ) : null}
          </Flex>

        </Flex>
      </Card>

      <Flex direction="column" justify="start" align="stretch" gap="2" width="100%" maxWidth={{
        initial: "100%",
        md: "300px"
      }} className="md:sticky md:top-4 md:self-start md:max-h-[calc(100vh-2rem)] md:overflow-y-auto">
        <Flex direction="column" justify="between" align="stretch" gap="2" className="w-full" width="100%">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/${entry.id}/download`} className="w-full justify-center">
              Descargar contenido en formato PDF
              <DownloadIcon />
            </Link>
          </Button>
        </Flex>

        <Card className="w-full">
          <Flex direction="column" gap="2" width="100%">
            <Heading size="5" as="h2">
              Tabla de Contenidos
            </Heading>
            <ScrollArea type="auto" scrollbars="vertical" style={{ height: "30dvh" }}>
              <TOC markdown={content}
                className="ml-4 [&_a]:transition-all [&_a]:ease-all [&_a]:hover:font-bold [&_a]:data-[active=true]:font-bold"
                ul='pl-4 py-1'
                li="py-1"
                scrollAlign="start" />
            </ScrollArea>
          </Flex>
        </Card>

        <Card className="w-full h-full">
          <Flex direction="column" gap="2" height="100%" width="100%">
            <Heading size="5" as="h2">
              Capitulos
            </Heading>
            <ScrollArea className="h-[50px]" type="auto" scrollbars="vertical">
              {chapters.map((c, index) => (
                <Flex key={index} direction="column" gap="2" width="100%">
                  <Link href={`/${entry.id}/${encodeURIComponent(c.title)}`} className="w-full" scroll={false}>
                    <Flex direction="row" align="center" gap="2">
                      <Badge>
                        #{index + 1}
                      </Badge>
                      <Text size="2">
                        {c.title || "Sin título"}
                      </Text>
                    </Flex>
                  </Link>
                  <Separator className="w-full" size="4" />
                </Flex>
              ))}
            </ScrollArea>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
