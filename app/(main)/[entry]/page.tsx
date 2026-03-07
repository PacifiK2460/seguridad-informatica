import { getEntryById } from "@/logic/db.api";
import { notFound, redirect } from "next/navigation";
import { parseChapters } from "@/logic/chapter.utils";

export default async function EntryPage({
  params,
}: {
  params: Promise<{ entry: string }>
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

  const chapters = entry.content ? parseChapters(entry.content) : [];

  if (chapters.length === 0) {
    notFound();
  }

  // Redirect to the first chapter
  redirect(`/${entryID}/${encodeURIComponent(chapters[0].title)}`);
}
