"use socket";

import { createEffect, createResource } from "solid-js";
import { createSocketMemo } from "../../socket/lib/shared";
import { db, messagesTable } from "./db";
import { useKv } from "./useKv";

const kv = await useKv("https://api.deno.com/databases/a53bab8f-3ab2-45c9-ba85-f8d9a8db5375/connect");

async function getMessages() {
    return db.select().from(messagesTable);
}

const addMessage = async (props: { name: string, message: string }) => {
    await db.insert(messagesTable).values({
        name: props.name,
        message: props.message
    })
    await kv.set(["triggerUpdate"], true);
}

export const useSocketChat = () => {
    const [messages, { refetch }] = createResource(() => getMessages());

    createEffect(() => {
        async function watch() {
            for await (const [_] of kv.watch([["triggerUpdate"]])) {
                refetch();
                console.log('refetching');
            }
        }
        watch();
    })


    return {
        messages: createSocketMemo(messages),
        addMessage,
    }
}