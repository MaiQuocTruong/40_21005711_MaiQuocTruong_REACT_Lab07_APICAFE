# ![Logo](./assets/logo.png) 
<h1><img src="https://emojis.slackmojis.com/emojis/images/1531849430/4246/blob-sunglasses.gif?1531849430" width="30"/> Shopping Cart App</h1>

> **Bài tập 7 React Lập Trình Thiết Bị Di Động**
<h4>Sử dụng những công nghệ sau:</h4>
<p>
  <img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white" />
  <img alt="Expo" src="https://img.shields.io/badge/-Expo-1B1F1B?style=flat-square&logo=expo&logoColor=white" />
  <img alt="Visual Studio Code" src="https://img.shields.io/badge/-Visual%20Studio%20Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white" />
  <img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" />
  <img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" />
  <img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white" />
</p>

---

## 📋 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Yêu Cầu](#yêu-cầu)
- [Cài Đặt](#cài-đặt)
- [API](#api)
- [Chạy Ứng Dụng](#chạy-ứng-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Sử Dụng](#sử-dụng)
- [Modals](#modals)
- [Liên Hệ](#liên-hệ)

---

## 🎉 Giới Thiệu

Dự án **Shopping Cart App** là một ứng dụng giỏ hàng được phát triển bằng **React Native**. Ứng dụng cho phép người dùng thêm, xóa, và điều chỉnh số lượng sản phẩm trong giỏ hàng và thực hiện thanh toán.

---

## 📌 Yêu Cầu

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau:

- **Node.js** (phiên bản >= 14)
- **npm** hoặc **yarn**
- **Expo CLI**

---

## 🛠️ Cài Đặt

1. Clone repository này:

    ```bash
    git clone https://github.com/your-repo/shopping-cart-app.git
    ```

2. Điều hướng đến thư mục của project:

    ```bash
    cd shopping-cart-app
    ```

3. Cài đặt dependencies:

    ```bash
    npm install
    yarn
    ```

4. Khởi động server phát triển Expo:

    ```bash
    npx expo start
    ```

---

## 🌐 API

Dự án có thể sử dụng **JSON Server** hoặc **MockAPI** để quản lý dữ liệu sản phẩm và giỏ hàng.

### 1. Sử dụng JSON Server

1. Cài đặt JSON Server toàn cục:

    ```bash
    npm install -g json-server
    ```

2. Khởi động JSON Server với file `db.json`:

    ```bash
    json-server --watch db.json --port 5000
    ```

### 2. Sử dụng MockAPI

1. Truy cập [MockAPI.io](https://mockapi.io/).
2. Tạo một tài khoản và dự án mới.
3. Tạo resource cho dữ liệu sản phẩm và giỏ hàng.
4. Lấy endpoint API và tích hợp vào ứng dụng.

---

## 🚀 Chạy Ứng Dụng

1. Sử dụng ứng dụng **Expo** (có sẵn trên iOS/Android) để quét mã QR hiển thị trên terminal hoặc trình duyệt.
2. Hoặc sử dụng trình giả lập/emulator để chạy ứng dụng.

---

## 🗂️ Cấu Trúc Dự Án

Dự án tuân theo cấu trúc tiêu chuẩn của **React Native**. Một số thư mục và file quan trọng:

- **`/assets`**: Chứa tất cả các tài nguyên tĩnh như hình ảnh sử dụng trong ứng dụng.
- **`/contexts/CartContext.js`**: Quản lý trạng thái giỏ hàng toàn cầu trên toàn ứng dụng.
- **`/screens/CartScreen.js`**: Màn hình chính để quản lý giao diện và tương tác của giỏ hàng.

---

## 🛒 Sử Dụng

1. **Thêm Sản Phẩm vào Giỏ Hàng**: Người dùng có thể thêm sản phẩm từ trang liệt kê sản phẩm (cần tích hợp riêng).
2. **Điều Chỉnh Số Lượng Sản Phẩm**: Khi đã có sản phẩm trong giỏ, người dùng có thể thay đổi số lượng hoặc xóa sản phẩm khỏi giỏ.
3. **Thanh Toán**: Người dùng có thể tiến hành thanh toán, xác nhận thanh toán và nhận thông báo thành công.

---

## 🔄 Modals

Ứng dụng sử dụng nhiều modal để nâng cao trải nghiệm người dùng:

- **Xác Nhận Xóa Sản Phẩm**: Hiển thị khi người dùng muốn giảm số lượng về 0 hoặc xóa sản phẩm.
- **Xác Nhận Thanh Toán**: Hiển thị khi người dùng tiến hành thanh toán.
- **Thanh Toán Thành Công**: Xác nhận thanh toán thành công và làm rỗng giỏ hàng.
- **Giỏ Hàng Trống**: Thông báo khi người dùng cố gắng thanh toán mà giỏ hàng trống.

---

## 📧 Liên Hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ:

- **Email**: your-email@example.com

---

**Cảm ơn bạn đã sử dụng dự án này!**

![Thank You](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2dtejc1bm1nNDJrdnU0ZW1zcTFkdzlpb3VrYWNoMXA3b2h4OThsbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/scZPhLqaVOM1qG4lT9/giphy.webp)
