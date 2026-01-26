import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entriesTable = sqliteTable("entries", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title"),
  content: text("content"),
});