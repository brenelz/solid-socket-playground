import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const client = createClient({
    url: "libsql://socket-playground-brenelz.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client);

export const usersTable = sqliteTable('users', {
    id: text('id'),
    username: text('username'),
    email: text('email'),
    avatar: text('avatar'),
    name: text('name'),
});

export const notificationsTable = sqliteTable('notifications', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    userId: text('userId').notNull(),
    issueId: text('issueId'),
    title: text('title'),
    createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
    readAt: text("timestamp")
});

export const messagesTable = sqliteTable('messages', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name'),
    message: text('message'),
});