const ChatService = require("../services/chat.service");
const ResponseFormatter = require("../utils/ResponseFormatter");

class ChatController {
  static async getChatRooms(req, res, next) {
    try {
      const chatRooms = await ChatService.getChatRooms();
      res.status(200).json(ResponseFormatter.success(
        chatRooms,
        "Success",
        200
      ));
    } catch (error) {
      next(error);
    }
  }

  static async addChatRooms(req, res, next) {
    try {
      const { name } = req.body;
      const newChat = await ChatService.createChat(name);
      res.status(200).json(ResponseFormatter.success(
        newChat,
        "Success",
        200
      ));
    } catch (error) {
      next(error);
    }
  }

  static async addUserToChat(req, res, next) {
    try {
      const user = req.user;
      const { chatId } = req.body;
      const chat = await ChatService.addUserToChat(chatId, user);
      res.status(200).json(ResponseFormatter.success(
        chat,
        "Success",
        200
      ));
    } catch (error) {
      next(error);
    }
  }

  static async getMessagesByChatId(req, res, next) {
    try {
      const { chatId } = req.params;
      const messages = await ChatService.getMessagesByChatId(chatId);
      res.status(200).json(ResponseFormatter.success(
        messages,
        "Success",
        200
      ));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ChatController