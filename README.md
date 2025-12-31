# FigaBydo (フィガバイド)

> **Figure Gallery Byte Domain**
> A serverless image hosting solution powered by Edge Computing.
> 基于边缘计算的无服务器图床系统。

## 🚀 Introduction (项目介绍)

**FigaBydo** is a lightweight, high-performance image host built entirely on a **Serverless Architecture**. Unlike traditional storage solutions, FigaBydo leverages **Edge Functions** and **Edge KV Storage** to handle image uploading, retrieval, and rendering directly at the network edge.

**FigaBydo** 是一个轻量级、高性能的图床系统，完全基于**无服务器架构 (Serverless)** 构建。与传统对象存储不同，它利用**边缘函数 (Edge Functions)** 和 **边缘 KV 存储 (Edge KV Storage)**，在离用户最近的网络边缘节点直接处理图片的上传、读取和渲染。

## 🛠 Tech Stack (技术栈)

This project explores the potential of purely serverless data handling:
本项目探索了纯无服务器数据处理的潜力：

* **Compute (计算):** Serverless Edge Functions (边缘函数)
    * Handles HTTP requests, authentication, and binary stream processing without a centralized server.
    * 无需中心服务器，直接处理 HTTP 请求、鉴权和二进制流。
* **Storage (存储):** Serverless Edge KV (边缘 KV 存储)
    * Stores image data as Base64/Binary values directly in a distributed Key-Value store.
    * 将图片以 Base64 或二进制形式直接存入分布式的键值对数据库中。
* **Delivery (分发):** Global CDN
    * Images are served instantly from the edge node closest to the user.
    * 利用边缘特性，实现图片的全球极速分发。

## ✨ Features (特性)

* ⚡ **Zero Latency:** No origin server round-trips; data lives on the edge.
* 🔒 **Secure:** API Key validation logic embedded in edge functions.
* 📦 **No Database:** No MySQL/PostgreSQL required. Just pure KV.
* 🖱️ **Drag & Drop:** Modern frontend interface with drag-and-drop uploading.

## 📦 Quick Start

## 声明
本项目由阿里云ESA提供加速、计算和保护
![image](src/image.png)
