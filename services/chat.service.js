const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

class ChatService {
  static async getChatRooms() {
    try {
      const chatRooms = await Chat
        .find()
        .sort({ name: -1 });
      return chatRooms;
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      throw new Error("Unable to fetch chat rooms");
    }
  }

  static async createChat(name) {
    try {
      const newChat = new Chat({ participants: [], name });
      await newChat.save();
      return newChat;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw new Error("Unable to create chat");
    }
  }

  static async addUserToChat(chatId, user) {
    try {
      console.log(user);

      const chat = await Chat.findById(chatId);
      if (!chat) {
        throw new Error("Chat not found");
      }

      // Kiểm tra nếu _id đã tồn tại trong participants
      const isExisting = chat.participants.some(p => p._id.toString() === user._id.toString());
      if (isExisting) {
        return chat;
      }

      // Thêm user mới vào participants
      chat.participants.push({ _id: user._id, name: user.name });
      await chat.save();
      return chat;
    } catch (error) {
      console.error("Error adding user to chat:", error);
      throw new Error("Unable to add user to chat");
    }
  }

  static async getMessagesByChatId(chatId) {
    try {
      const messages = await Message.find({ chat: chatId })
        .sort({ createdAt: 1 }); // sắp xếp theo thời gian tăng dần
      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Unable to fetch messages");
    }
  }

}

module.exports = ChatService

