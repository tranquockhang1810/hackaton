const express = require("express");
const ChatController = require("../../controllers/chat.controller");
const router = express.Router();
const auth = require("../../middleware/auth");
// const { validateLogin } = require("../../middleware/validate/auth.validate");

router.get("/rooms", auth, ChatController.getChatRooms);
router.post("/rooms", auth, ChatController.addChatRooms);
router.post("/add-user", auth, ChatController.addUserToChat);
router.get("/messages/:chatId", auth, ChatController.getMessagesByChatId);

module.exports = router;