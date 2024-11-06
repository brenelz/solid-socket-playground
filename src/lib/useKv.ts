export const useKv = async (url: string) => {
  if (globalThis.Deno) {
    return globalThis.Deno.openKv()
  }
  if (import.meta.env.DEV) {
    const { openKv } = await import('@deno/kv');
    return openKv(url);
  }
}