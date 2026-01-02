
function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)].map(function (b) {
        return b.toString(16).padStart(2, '0')
    }).join('');
}

async function doPut(md5, host) {
    await cache.put("http://" + host + "/" + md5, new Response("Hello World"));
}

async function handleRequest(request) {

    const formData = await request.formData();
    const file = formData.get("file");
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const md5 = bufferToHex(hashBuffer);
    const host = request.headers.get("Host");
    const data = {
        code: 200,
        message: "上传及计算成功",
        body: "http://" + host + "/" + md5,
        filename: file.name
    };

    await doPut(md5, host);

    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    });

}

export default {
    async fetch(request) {
        return handleRequest(request);
    }
};