"use socket";

import { createEffect, createResource, createSignal } from "solid-js";
import { createSocketMemo } from "../../socket/lib/shared";
import { db, messagesTable } from "./db";

async function getMessages() {
    return db.select().from(messagesTable);
}

if (!globalThis.triggerUpdate) {
    const [triggerUpdate, setTriggerUpdate] = createSignal(false);
    globalThis.triggerUpdate = triggerUpdate;
    globalThis.setTriggerUpdate = setTriggerUpdate;
}

const addMessage = async (props: { name: string, message: string }) => {
    await db.insert(messagesTable).values({
        name: props.name,
        message: props.message
    })
    globalThis.setTriggerUpdate(true);
}

export const useSocketChat = () => {
    const [messages, { refetch }] = createResource(() => getMessages());

    createEffect(() => {
        refetch();
        if (globalThis.triggerUpdate()) {
            globalThis.setTriggerUpdate(false);
        }
    });

    return {
        messages: createSocketMemo(messages),
        addMessage,
    }
}