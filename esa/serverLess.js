function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)].map(function (b) {
        return b.toString(16).padStart(2, '0')
    }).join('');
}

async function handleRequest(request) {
    const url = new URL(request.url);
    if (request.method === "GET") {
        try {
            const cachedResponse = await cache.get(request.url);

            if (cachedResponse) {
                console.log("命中缓存:", request.url);
                return cachedResponse;
            } else {
                return new Response("提取不到图片 (Cache Miss)", {
                    status: 404,
                    headers: { "content-type": "text/plain;charset=UTF-8" }
                });
            }
        } catch (e) {
            return new Response("Cache Error: " + e.message, { status: 500 });
        }
    }
    if (request.method === "POST") {
        try {
            const formData = await request.formData();
            const file = formData.get("file");

            if (!file || typeof file === 'string') {
                return new Response(JSON.stringify({ code: 400, message: "文件无效" }), {
                    headers: { "content-type": "application/json" }
                });
            }
            const arrayBuffer = await file.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
            const hash = bufferToHex(hashBuffer);
            const host = request.headers.get("Host") || url.host;
            const imageUrl = `http://${host}/${hash}`;
            const imageResponse = new Response(arrayBuffer, {
                headers: {
                    "Content-Type": file.type || "application/octet-stream",
                    "Cache-Control": "public, max-age=120",
                    "ETag": hash,
                    "Access-Control-Allow-Origin": "*"
                }
            });
            await cache.put(imageUrl, imageResponse);
            const data = {
                code: 200,
                message: "上传及计算成功",
                algo: "SHA-256",
                body: imageUrl,
                filename: file.name
            };

            return new Response(JSON.stringify(data), {
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*"
                },
            });

        } catch (error) {
            return new Response(JSON.stringify({
                code: 500,
                message: "服务器内部错误",
                error: error.message
            }), {
                headers: { "content-type": "application/json;charset=UTF-8" }
            });
        }
    }

    return new Response("Method Not Allowed", { status: 405 });
}

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request);
    }
};