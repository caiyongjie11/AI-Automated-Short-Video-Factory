import ffmpeg from "fluent-ffmpeg";
import { v4 as uuidv4 } from "uuid";

export async function createVideo(audioPath) {
  return new Promise((resolve, reject) => {
    const output = `output/${uuidv4()}.mp4`;

    ffmpeg()
      .input("assets/background.mp4")
      .input(audioPath)
      .outputOptions([
        "-c:v libx264",
        "-c:a aac",
        "-shortest"
      ])
      .save(output)
      .on("end", () => {
        resolve(output);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}