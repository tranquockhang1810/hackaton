const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Hackaton Chat App!" }));
router.use("/api/v1/auth", require("./auth/index"));
router.use("/api/v1/chat", require("./chat/index"));

module.exports = router;
