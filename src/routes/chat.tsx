import { createSignal, For, Show } from "solid-js";
import { useSocketChat } from "~/lib/socket-chat";
import { createSocketMemo } from "../../socket/lib/shared";

export default function Chat() {
    const [name, setName] = createSignal('');

    const updateName = (name: string) => {
        setName(name);
    }
    return (
        <>
            <h1>Chat</h1>
            <h2>{name()}</h2>
            <Show when={name()} fallback={<EnterName updateName={updateName} />}>
                <Chatbox name={name()} />
            </Show>

        </>
    )
}

type ChatboxProps = {
    name: string;
}

function Chatbox(props: ChatboxProps) {
    const socket = useSocketChat();

    return (
        <>
            <ul>
                <For each={socket.messages()}>
                    {message => (
                        <li>{message.name} - {message.message}</li>
                    )}
                </For>
            </ul>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                socket.addMessage({ name: props.name, message: String(formData.get('message')) })
                e.currentTarget.reset();
            }}>
                Enter your message: <input type="text" name="message" autofocus />
                <button>
                    Send
                </button>
            </form >
        </>
    )
}

type EnterNameProps = {
    updateName: (name: string) => void;
}

function EnterName(props: EnterNameProps) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            props.updateName(String(formData.get('name')))
            e.currentTarget.reset();
        }}>
            Enter your name: <input type="text" name="name" autofocus />
            <button>
                Enter
            </button>
        </form>
    )
}