# WebSocket Application

This project is a modular WebSocket-based application built with **NestJS**. It supports real-time communication and adheres to clean code principles with clear separation of concerns.

---

## Project Structure

### 1. `auth/`
Handles authentication logic for WebSocket connections.

- **`guards/ws-auth.guard.ts`**: Implements WebSocket authentication guard.
- **`auth.service.ts`**: Provides authentication-related services.

---

### 2. `notifications/`
Manages real-time notification functionality.

- **`notifications.gateway.ts`**: WebSocket gateway for notifications.
- **`notification.service.ts`**: Business logic for handling notifications.
- **`dto/`**: Data transfer objects for notifications.
  - **`send-notification.dto.ts`**: DTO for sending notifications.
  - **`update-role.dto.ts`**: DTO for updating user roles.

---

### 3. `stocks/`
Handles stock-related real-time updates.

- **`stock.gateway.ts`**: WebSocket gateway for stock updates.

---

### 4. `gateway/`
Manages WebSocket server configuration and module.

- **`gateway.module.ts`**: Declares and configures WebSocket gateway-related providers.
- **`gateway.websocket.ts`**: Core WebSocket server implementation.

---

### 5. `common/`
Contains reusable services and utilities.

- **`services/http.service.ts`**: Handles HTTP requests and API interactions.

---

### 6. Root Files
- **`app.module.ts`**: Main application module, importing and configuring all submodules.
- **`app.controller.ts`**: REST API controller for testing and basic endpoints.
- **`app.service.ts`**: Application-level service logic.
- **`main.ts`**: Entry point for the NestJS application.

---

## Features
- **Real-time communication** via WebSocket.
- **Modular structure** for scalability and maintainability.
- **DTO-based validation** for consistent data handling.
- **Authentication support** for WebSocket connections.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
