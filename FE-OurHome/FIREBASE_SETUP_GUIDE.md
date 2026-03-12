# Hướng dẫn cấu hình Firebase để tránh lỗi 400

## Các vấn đề đã được sửa:

### 1. Xung đột phiên bản Firebase

- **Vấn đề**: Code đang trộn lẫn Firebase v8 (compat) và Firebase v9+ (modular)
- **Giải pháp**: Đã cập nhật `FirebaseConfig.js` để sử dụng Firebase v9+ modular API

### 2. Thiếu script reCAPTCHA

- **Vấn đề**: File `index.html` không có script reCAPTCHA
- **Giải pháp**: Đã thêm `<script src="https://www.google.com/recaptcha/api.js"></script>`

### 3. Lỗi "reCAPTCHA has already been rendered"

- **Vấn đề**: reCAPTCHA bị render nhiều lần trên cùng một element
- **Giải pháp**:
  - **Lazy Initialization**: Chỉ khởi tạo reCAPTCHA khi cần thiết (khi gửi OTP)
  - **ID duy nhất**: Mỗi component sử dụng ID reCAPTCHA riêng biệt
  - **Kiểm tra và xóa**: Tự động kiểm tra và xóa reCAPTCHA cũ trước khi tạo mới
  - **Retry mechanism**: Tự động thử lại nếu gặp lỗi

### 4. Cải thiện validation và error handling

- Thêm validation cho số điện thoại
- Cải thiện error handling với các mã lỗi cụ thể
- Thêm loading state

## Cách hoạt động mới:

### Lazy Initialization

- reCAPTCHA **KHÔNG** được khởi tạo khi component mount
- Chỉ khởi tạo khi user nhấn nút "Send Verification Code"
- Tránh xung đột với các component khác

### ID duy nhất

- Mỗi instance của component có ID reCAPTCHA riêng: `recaptcha-{randomString}`
- Tránh xung đột giữa nhiều component

### Auto-retry

- Nếu gặp lỗi "already rendered", tự động xóa và thử lại
- Nếu vẫn lỗi, tự động reload trang sau 2 giây

## Cần kiểm tra trong Firebase Console:

### 1. Authentication > Sign-in method

- Đảm bảo **Phone** authentication đã được bật
- Kiểm tra **Phone numbers for testing** nếu đang test

### 2. Authentication > Settings > Authorized domains

- Thêm domain của bạn vào danh sách authorized domains:
  - `localhost` (cho development)
  - Domain production của bạn

### 3. reCAPTCHA Enterprise (nếu sử dụng)

- Đảm bảo reCAPTCHA site key đã được cấu hình đúng
- Kiểm tra domain trong reCAPTCHA settings

## Cách test:

1. Chạy ứng dụng: `npm start`
2. Truy cập trang verify phone
3. Nhập số điện thoại với định dạng: `+84912345678`
4. Nhấn "Send Verification Code" (reCAPTCHA sẽ được khởi tạo lúc này)
5. Kiểm tra console để xem log reCAPTCHA

## Lỗi thường gặp và giải pháp:

- **Lỗi 400**: Thường do domain không được authorize hoặc reCAPTCHA chưa được cấu hình
- **Lỗi invalid-phone-number**: Kiểm tra định dạng số điện thoại
- **Lỗi too-many-requests**: Đợi một lúc rồi thử lại
- **Lỗi "reCAPTCHA has already been rendered"**:
  - Hệ thống sẽ tự động xử lý
  - Nếu vẫn lỗi, trang sẽ tự động reload sau 2 giây

## Debug:

Mở Developer Tools > Console để xem các log:

- "reCAPTCHA initialized successfully"
- "reCAPTCHA solved: [token]"
- "reCAPTCHA already exists, clearing container..."
- Các error message chi tiết

## Lưu ý quan trọng:

- **reCAPTCHA chỉ được khởi tạo khi cần thiết** (khi gửi OTP)
- **Không cần đợi** sau khi trang load
- **Mỗi component có ID reCAPTCHA riêng** nên không bị xung đột
- Nếu gặp lỗi reCAPTCHA, hệ thống sẽ tự động xử lý
