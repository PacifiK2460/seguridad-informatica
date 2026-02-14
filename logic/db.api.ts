"use server"

import { drizzle } from 'drizzle-orm/libsql';
import { eq, like, or } from "drizzle-orm";
import { entriesTable } from './schema';

const db = drizzle({
    connection: {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
    }
});

export async function getEntries(query?: string) {
    if (!query) {
        return await db.select().from(entriesTable).orderBy(entriesTable.id);
    }

    // Simple search implementation
    return await db.select().from(entriesTable)
        .where(
            or(
                like(entriesTable.content, `%${query}%`),
                like(entriesTable.title, `%${query}%`),
                like(entriesTable.id, `%${query}%`)
            )
        )
        .orderBy(entriesTable.id);
}

export async function getEntryById(id: string) {
    const _id = Number(id);
    if (isNaN(_id)) {
        throw new Error("Invalid ID");
    }

    const entry = await db.select().from(entriesTable).where(eq(entriesTable.id, _id)).limit(1);
    return entry[0];
}

export async function createEntry(title: string, content: string) {
    const result = await db.insert(entriesTable).values({
        title,
        content,
    }).returning();
    return result[0];
}

export async function updateEntry(id: string, title: string, content: string) {
    const _id = Number(id);
    if (isNaN(_id)) {
        throw new Error("Invalid ID");
    }
    const result = await db.update(entriesTable)
        .set({ title, content })
        .where(eq(entriesTable.id, _id))
        .returning();
    return result[0];
}

export async function deleteEntry(id: string) {
    const _id = Number(id);
    if (isNaN(_id)) {
        throw new Error("Invalid ID");
    }
    await db.delete(entriesTable).where(eq(entriesTable.id, _id));
}