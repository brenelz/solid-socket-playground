import { createSignal } from "solid-js";
import { useTodos } from "~/lib/socket";
import { createSocketMemo } from "../../socket/lib/shared";
import { createAsync, query } from "@solidjs/router";

const testData = query(async function () {
    "use server";
    console.log('on server');
}, 'getData');

export default function Home() {
    const test = createAsync(() => testData())

    console.log('on client');

    return (
        <>
            <p>test page</p>
        </>
    )
}
