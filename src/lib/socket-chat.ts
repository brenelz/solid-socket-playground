"use socket";

import { createEffect, createResource, createSignal } from "solid-js";
import { createSocketMemo } from "../../socket/lib/shared";
import { db, messagesTable } from "./db";

async function getMessages() {
    return db.select().from(messagesTable);
}

const [triggerUpdate, setTriggerUpdate] = createSignal(false);

const addMessage = async (props: { name: string, message: string }) => {
    await db.insert(messagesTable).values({
        name: props.name,
        message: props.message
    })
    setTriggerUpdate(true);

}

export const useSocketChat = () => {
    const [messages, { refetch }] = createResource(() => getMessages());

    createEffect(() => {
        refetch();
        if (triggerUpdate()) {
            setTriggerUpdate(false);
        }
    });

    return {
        messages: createSocketMemo(messages),
        addMessage,
    }
}