import { exec } from "child_process";

export async function generateVoice(text) {
  return new Promise((resolve, reject) => {
    const output = "temp/output.mp3";

    const safeText = text.replace(/"/g, "'");

    const command = `edge-tts --voice zh-CN-XiaoxiaoNeural --text "${safeText}" --write-media ${output}`;

    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
}