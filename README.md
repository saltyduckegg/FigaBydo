# FigaBydo (フィガバイド)

> **Figure Gallery Byte Domain**
> A serverless image hosting solution powered by Edge Storage and Caching.
> 基于边缘存储和缓存的无服务器图床系统

## 🚀 Introduction (项目介绍)

**FigaBydo** is a low-cost, lightweight, high-performance image hosting system built entirely on a **Serverless Architecture** using pure, dependency-free native HTML, CSS, and JS. Unlike traditional object storage, it leverages **Edge Functions** and **Edge KV Storage** to handle image uploading, retrieval, and rendering directly at the network edge closest to the user. It prioritizes edge node caching to avoid repeated uploads and reads, achieving global high-speed image distribution at ultra-low cost.

**FigaBydo** 是一个低成本、轻量级、高性能的图床系统，完全基于**无服务器架构 (Serverless)** 和纯粹无依赖的原生 html css js 构建。与传统对象存储不同，它利用**边缘函数 (Edge Functions)** 和 **边缘 KV 存储 (Edge KV Storage)**，在离用户最近的网络边缘节点直接处理图片的上传、读取和渲染。优先利用边缘节点的缓存优化，避免重复上传和读取，超低成本实现图片的全球极速分发。

## 🛠 Tech Stack (技术栈)

This project explores the potential of a pure serverless tech stack: Pages + Edge Functions + Edge KV Storage + ESA Cache Management.
本项目探索了纯无服务器技术栈的潜力：pages + 边缘函数 + 边缘 kv 存储 + ESA缓存管理

* **Frontend (前端):** Content-Security-Policy & Native Web Technologies (原生技术栈)
    * Built with pure HTML/CSS/JavaScript. No frameworks, no build steps. 
    * 采用纯原生 HTML/CSS/JavaScript 构建，无框架、无构建步骤，极致轻量。
* **Compute (计算):** Serverless Edge Functions (边缘函数)
    * Handles HTTP requests, SHA-256 hashing, and binary stream processing.
    * 处理 HTTP 请求、SHA-256 哈希计算和二进制流处理。
* **Storage (存储):** Serverless Edge KV (边缘 KV 存储)
    * Stores unique image data based on Edge KV storage and edge node caching.
    * 基于边缘kv存储和边缘节点缓存，储存独特图片数据
* **Delivery (分发):** Global CDN
    * Images are served instantly from the edge node closest to the user using aggressive caching.
    * 利用边缘节点激进缓存策略，实现全球极速分发。

## ✨ Features (特性)

* ⚡ **Smart Deduplication (智能去重):** Uses SHA-256 hashing to identify and store only unique files, saving storage costs. (利用 SHA-256 哈希识别文件，仅存储唯一数据副本)
* 🏎️ **Edge Caching (边缘缓存):** Hot files are cached directly on edge nodes for millisecond-level access. (热点文件直接在边缘节点缓存，毫秒级访问)
* 📦 **No Database (无需传统数据库):** No MySQL/PostgreSQL required. Pure KV storage. (纯 KV 架构)
* 🖱️ **Drag & Drop (原生现代化前端，支持拖拽上传):** Modern native frontend interface with drag-and-drop uploading. (原生现代化前端，支持拖拽上传)

## 📦 Quick Start

### 部署步骤
1. 部署 ESA pages
使用阿里云 ESA pages 部署，直接导入github仓库即可
https://esa.console.aliyun.com/edge/pages/list

2. 创建 kv 存储
创建名为 figabydo_kv 的 kv 存储
https://esa.console.aliyun.com/edge/storage/resource

3. 享受服务！


### 声明
本项目由阿里云ESA提供加速、计算和保护
![image](src/image.png)
