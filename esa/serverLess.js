const edgeKV = new EdgeKV({ namespace: "figabydo_kv" });// 命名空间是 kv


function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)].map(function (b) {
        return b.toString(16).padStart(2, '0')
    }).join('');
}


// async function checkCache(key){
//     const cachedResponse = await cache.get(key);
//     if (cachedResponse) {
//         return cachedResponse;
//     }
//     return null;
// }

async function handleRequest(request) {
    const url = new URL(request.url);


    if (request.method === "GET") {
        try {
            const hash = url.pathname.split("/")[1];
            const contentType = hash.split(".")[1];
            const host = request.headers.get("Host") || url.host;
            const imageUrl = `https://${host}/${hash}`;
            const imageUrlHttp = `http://${host}/${hash}`;
            const cachedResponse = await cache.get(imageUrlHttp);

            if (cachedResponse) {
                return cachedResponse;
            } else {

                let getType = { type: "arrayBuffer" };
                let value = await edgeKV.get(hash, getType);
                if (value === undefined) {
                    return new Response("提取不到图片 (Cache Miss & EdgeKV Miss)", {
                        status: 404,
                        headers: { "content-type": "text/plain;charset=UTF-8" }
                    });
                } else {
                    const imageResponse = new Response(value, {
                        headers: {
                            "Content-Type": `image/${contentType}` || "application/octet-stream",
                            "Cache-Control": "max-age=86400",
                            "Access-Control-Allow-Origin": "*"
                        }
                    });
                    await cache.put(imageUrlHttp, imageResponse);
                    return imageResponse;
                }

            }
        } catch (e) {
            return new Response("Get Cache Error: " + e.message, { status: 500 });
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
            const contentType = file.type.split("/")[1];
            const imageUrl = `https://${host}/${hash}.${contentType}`;
            const imageUrlHttp = `http://${host}/${hash}.${contentType}`;
            const imageResponse = new Response(arrayBuffer, {
                headers: {
                    "Content-Type": file.type || "application/octet-stream",
                    "Cache-Control": "max-age=86400",
                    // "ETag": hash,
                    "Access-Control-Allow-Origin": "*"
                }
            });
            const cachedResponse = await cache.get(imageUrlHttp);
            if (cachedResponse) {
                const data = {
                    code: 200,
                    message: "Cache Hit",
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
            }
            await cache.put(imageUrlHttp, imageResponse);
            await edgeKV.put(hash + "." + contentType, arrayBuffer);
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