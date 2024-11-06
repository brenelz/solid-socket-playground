"use socket";

import { createEffect, createResource, createSignal } from "solid-js";
import { createSocketMemo } from "../../socket/lib/shared";
import { db, messagesTable } from "./db";
//import { useKv } from "./useKv";

//const kv = await useKv("https://api.deno.com/databases/a53bab8f-3ab2-45c9-ba85-f8d9a8db5375/connect");
const [triggerUpdate, setTriggerUpdate] = createSignal(false);

async function getMessages() {
    return db.select().from(messagesTable);
}

const addMessage = async (props: { name: string, message: string }) => {
    await db.insert(messagesTable).values({
        name: props.name,
        message: props.message
    })
    //await kv.set(["triggerUpdate"], true);
    setTriggerUpdate(true);
}

export const useSocketChat = () => {
    const [messages, { refetch }] = createResource(() => getMessages());

    createEffect(() => {
        refetch();
        if (triggerUpdate()) {
            setTriggerUpdate(false);
        }
    })


    return {
        messages: createSocketMemo(messages),
        addMessage,
    }
}