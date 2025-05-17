const ResponseFormatter = require("../../utils/ResponseFormatter");

const validateMessageData = (messageData) => {
  const { chatId, sender, receiver, content, images } = messageData;

  if (!chatId || !sender || !receiver) {
    return ResponseFormatter.error("Missing required fields: chatId, sender, receiver.", 400);
  }

  if (!content && !images) {
    return ResponseFormatter.error("Message must include either content or an image.", 400);
  }

  if (content && images && images.length > 0) {
    return ResponseFormatter.error("Message cannot contain both text and images.", 400);
  }

  if (images) {
    if (!Array.isArray(images)) {
      return ResponseFormatter.error("Images must be an array.", 400);
    }
    if (images.length > 5) {
      return ResponseFormatter.error("Maximum of 5 images allowed.", 400);
    }
    for (const img of images) {
      if (typeof img !== "string" || !img.trim()) {
        return ResponseFormatter.error("Each image must be a non-empty string.", 400);
      }
    }
  }

  return null;
};

module.exports = { validateMessageData };
