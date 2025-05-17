const socketIo = require("socket.io");
const Message = require("../models/message.model");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const ChatService = require("../services/chat.service");

// Map để lưu userId -> socketId
const onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    /**
 * User online: gửi từ client khi kết nối
 * data = { token: string, chatRoomId: string }
 */
    socket.on("user-online", async ({ token, chatRoomId }) => {
      // Lưu socketId
      const user = jwt.verify(token, JWT_SECRET);
      const userId = user._id;
      onlineUsers.set(userId, socket.id);
      console.log(`🔵 User ${userId} online, socket ${socket.id}`);
      await ChatService.addUserToChat(chatRoomId, user)

      // Rời khỏi tất cả các room hiện tại trừ room mặc định (socket.id)
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          socket.leave(room);
          console.log(`↩️ User ${userId} left room ${room}`);
        }
      }

      // Tham gia 1 room mới
      socket.join(chatRoomId);
      console.log(`📥 User ${userId} joined room ${chatRoomId}`);
    });

    /**
     * Gửi tin nhắn trong phòng
     * messageData = { chatRoomId, token, message }
     */
    socket.on("send-message", async ({ chatRoomId, token, message }) => {
      console.log(`📨 Message to room ${chatRoomId}`);

      try {
        // 1. Verify & decode token
        const decoded = jwt.verify(token, JWT_SECRET);
        const senderId = decoded._id;
        const senderName = decoded.name;

        // 2. Save message
        const newMessage = new Message({
          chat: chatRoomId,
          senderId,
          senderName,
          message,
        });
        await newMessage.save();

        // 3. Emit to all in room
        io.to(chatRoomId).emit("receive-message", {
          _id: newMessage._id,
          chat: chatRoomId,
          senderId,
          senderName,
          message,
          createdAt: newMessage.createdAt,
        });

      } catch (error) {
        console.error("❌ Error in send-message:", error);
        socket.emit("error-message", { message: "Invalid token or failed to send message." });
      }
    });

    /**
     * Khi user disconnect
     */
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`🔴 User ${userId} disconnected (socket ${socket.id})`);
          break;
        }
      }
    });
  });
};

module.exports = { initializeSocket, onlineUsers };
