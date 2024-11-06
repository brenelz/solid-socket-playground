import { query } from "@solidjs/router";

export const testData = query(async function () {
    "use server";
    console.log('on server');
    return 'test';
}, 'getData');