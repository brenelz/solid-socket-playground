"use socket";

import { createSignal } from "solid-js";
import { createSocketMemo } from "../../socket/lib/shared";

type Message = {
    name: string;
    message: string;
}

const [messages, setMessages] = createSignal<Message[]>([]);

const addMessage = (props: { name: string, message: string }) => {
    setMessages(messages => {
        return [...messages, {
            name: props.name,
            message: props.message
        }]
    })
}

export const useSocketChat = () => {
    return {
        messages: createSocketMemo(messages),
        addMessage,
    }
}