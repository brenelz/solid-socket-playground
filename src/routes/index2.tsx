import { createSignal } from "solid-js";
import { useTodos } from "~/lib/socket";
import { createSocketMemo } from "../../socket/lib/shared";

export default function Home() {
    const [filter, setFilter] = createSignal('date');
    const serverTodos = useTodos(createSocketMemo(() => filter()));

    return (
        <pre>
            {JSON.stringify(serverTodos.todos(), null, 4)}
            <button onClick={() => {
                serverTodos.addTodo()
                setFilter('something else');
            }}>Add me</button>
        </pre >
    );
}
