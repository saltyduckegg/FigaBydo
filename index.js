const uploadZoneEl = document.getElementById('upload-zone')
const maskEl = document.getElementById('mask');
const previewZoneEl = document.getElementById('preview-zone');

// document.addEventListener("dragenter", function (e) {
//     e.preventDefault()
//     maskEl.classList.remove("hidden")
// })

// # drag logic

// ## mask:


["dragenter", "dragleave", "dragover", "drop"].forEach(function (event) {
    document.addEventListener(event, function (e) {
        e.preventDefault()
        if (event !== "dragover") {
            maskEl.classList.toggle("hidden")
        }
    })
});

// ## uploadZone:

["dragenter", "dragleave", "dragover", "drop"].forEach(function (event) {
    uploadZoneEl.addEventListener(event, async function (e) {
        e.preventDefault()
        if (event !== "dragover") {
            uploadZoneEl.classList.toggle("dragover")
            if (event === "drop") {
                console.log(e.dataTransfer.files[0])
                const file = e.dataTransfer.files[0]
                await dealFile(file)
            }
        }
    })
});

// # file logic
const MAX_ORIGIN_SIZE = 1024 * 1024 * 0.75;
async function dealFile(file) {
    console.log("dealFile:", file.type.split("/")[0])
    if (file.type.split("/")[0] !== "image") {
        alert("请上传图片")
        return
    }
    if (file.size > MAX_ORIGIN_SIZE) {
        alert("图片大小超过限制")
        return
    }
    changeZone()
    showImgPreview(file)
}

function changeZone() {
    uploadZoneEl.classList.toggle("hidden")
    previewZoneEl.classList.toggle("hidden")
}

function showImgPreview(file) {
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl)
    const imgEl = document.getElementById("pre-upload-img")
    imgEl.src = imgUrl
}
const logoEl = document.getElementById("logo")
const uploadBtnEl = document.getElementById("upload-btn")
const deleteBtnEl = document.getElementById("delete-btn")
const previewTextContainerEl = document.getElementById("preview-text-container")
const previewDetailContainerEl = document.getElementById("preview-detail-container")
const previewFilenameEl = document.getElementById("preview-filename")
const previewFilesizeEl = document.getElementById("preview-filesize")
const permanentLinkEl = document.getElementById("permanent-link")
const temporaryLinkEl = document.getElementById("temporary-link")
uploadBtnEl.addEventListener("click", async function () {
    const url = await uploadImg(file)
    permanentLinkEl.textContent = url
    temporaryLinkEl.textContent = url.replace("https://", "http://")
    previewFilenameEl.textContent = file.name
    previewFilesizeEl.textContent = file.size
    previewTextContainerEl.classList.toggle("hidden")
    previewDetailContainerEl.classList.toggle("hidden")
})

deleteBtnEl.addEventListener("click", function () {
    previewTextContainerEl.classList.add("hidden")
    previewDetailContainerEl.classList.remove("hidden")
    changeZone()
})
logoEl.addEventListener("click", function () {
    previewTextContainerEl.classList.add("hidden")
    previewDetailContainerEl.classList.remove("hidden")
    changeZone()
})


async function uploadImg(file) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch('/esa/serverLess', {
        method: 'POST',
        body: formData
    })
    const data = await response.json()
    console.log(data)
    // alert(data.body);
    return data.body
    // await testUrl(data.body)
}

async function testUrl(url) {
    const response = await fetch(url)
    const data = await response.blob()
    console.log("图片下载成功，大小:", data.size);
    console.log(data)
    // const objectURL = URL.createObjectURL(data);
    document.getElementById("preview").src = url;
}