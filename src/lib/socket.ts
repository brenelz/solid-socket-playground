"use socket";

import { createEffect, createSignal } from "solid-js";
import { createSocketMemo } from "../../socket/lib/shared";

export type Todo = {
    id: string;
    name: string;
}

const [todos, setTodos] = createSignal<Todo[]>([{
    id: "1",
    name: 'test'
}]);

const addTodo = () => {
    setTodos([
        ...todos(),
        {
            id: '2',
            name: 'add me'
        }
    ]);
}

export const useTodos = (filter: () => string | undefined) => {
    createEffect(() => {
        console.log({ filter: filter() })
    })
    return {
        todos: createSocketMemo(() => todos()),
        addTodo
    }
};