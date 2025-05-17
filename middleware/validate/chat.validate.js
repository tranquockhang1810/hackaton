const UserService = require("../../services/user.service");
const ChatService = require("../../services/chat.service");
const ResponseFormatter = require("../../utils/ResponseFormatter");

const validateGetChatParams = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return next({ status: 400, message: "Invalid user ID format" });
    }

    const userExists = await UserService.userExists(userId);
    if (!userExists) {
      return next({ status: 404, message: "User not found" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateSeenChatParams = async (data) => {
  const { chatId, userId } = data;
  if (!chatId) {
    return ResponseFormatter.error("Chat ID is required", 400);
  }
  if (!userId) {
    return ResponseFormatter.error("User ID is required", 400);
  }
  const chatExists = await ChatService.getChatById(chatId);
  if (!chatExists) {
    return ResponseFormatter.error("Chat not found", 404);
  }
  const isUserInChat = await ChatService.isUserInChat(chatId, userId);
  if (!isUserInChat) {
    return ResponseFormatter.error("User is not part of this chat", 403);
  }
  return null;
}

module.exports = { validateGetChatParams, validateSeenChatParams };
