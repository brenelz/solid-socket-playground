"use socket";

import { createEffect, createSignal } from "solid-js";
import { createSocketMemo } from "../../socket/lib/shared";
import { db, notificationsTable } from "./db";
import { eq } from "drizzle-orm";

const [triggerUpdate, setTriggerUpdate] = createSignal(false);

const sendNotification = async (userId: string | undefined) => {
    await db.insert(notificationsTable).values({
        userId: String(userId),
        title: 'test notification'
    });
    setTriggerUpdate(true);
}

export const useSocket = (userId: () => string | undefined) => {
    const [notifications, setNotifications] = createSignal<any[]>();

    createEffect(() => {
        async function getData() {
            const res = await db.select().from(notificationsTable).where(eq(notificationsTable.userId, String(userId()))).all();
            setNotifications(res);
        }
        getData();
        if (triggerUpdate()) {
            setTriggerUpdate(false);
        }
    });

    return {
        notifications: createSocketMemo(notifications),
        sendNotification
    }
}