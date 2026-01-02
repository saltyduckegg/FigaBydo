async function handleRequest(request) {
    const data = {
        code: 200,
        message: "上传成功",
        body: "Hello World (来自 JSON)"
    };
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    })
}
export default {
    async fetch(request) {
        return handleRequest(request);
    }
};