async function handleRequest(request) {
    return new Response("Hello World", {
        headers: {
            "content-type": "text/plain;charset=UTF-8",
        },
    })
}
export default {
    async fetch(request) {
        return handleRequest(request);
    }
};