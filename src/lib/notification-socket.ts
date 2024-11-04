"use socket";

import { createEffect, createResource, createSignal } from "solid-js";
import { createSocketMemo } from "../../socket/lib/shared";
import { db, notificationsTable } from "./db";
import { eq } from "drizzle-orm";

async function getData(userId: string) {
    return db.select().from(notificationsTable).where(eq(notificationsTable.userId, userId)).all();
}

const [triggerUpdate, setTriggerUpdate] = createSignal(false);

const sendNotification = async (userId: string | undefined) => {
    await db.insert(notificationsTable).values({
        userId: String(userId),
        title: 'test notification'
    });
    setTriggerUpdate(true);
}

export const useSocket = (userId: () => string | undefined) => {
    const [notifications, { refetch }] = createResource(() => userId(), getData);

    createEffect(() => {
        refetch();
        if (triggerUpdate()) {
            setTriggerUpdate(false);
        }
    });

    return {
        notifications: createSocketMemo(notifications),
        sendNotification
    }
}