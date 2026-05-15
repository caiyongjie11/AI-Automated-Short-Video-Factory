import express from "express";
import { generateScript } from "../services/aiService.js";
import { generateVoice } from "../services/ttsService.js";
import { createVideo } from "../services/videoService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { topic } = req.body;

    const script = await generateScript(topic);

    const audioPath = await generateVoice(script);

    const videoPath = await createVideo(audioPath);

    res.json({
      success: true,
      script,
      video: `http://localhost:5000/${videoPath}`
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;