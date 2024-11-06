import { createAsync, query } from "@solidjs/router";
import { testData } from "~/lib/server";

export default function Home() {
    const test = createAsync(() => testData())

    console.log('on client');

    return (
        <>
            <p>test page</p>
            {JSON.stringify(test())}
        </>
    )
}
