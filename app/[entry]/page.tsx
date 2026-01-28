import { getEntries, getEntryById } from "@/logic/db.api";

export default async function EntryPage({
  params,
}: {
  params: Promise<{ entry: string }>
}) {
  const entryParams = await params;

  const entryID = entryParams.entry || null;
  const entries = await getEntries();
  const entry = entryID ? await getEntryById(entryID) : entries[0];

  return (
   <>
   contenido
   </>
  );
}
