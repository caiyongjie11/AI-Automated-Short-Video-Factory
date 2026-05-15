import { useState } from "react";
import axios from "axios";

export default function App() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");
  const [script, setScript] = useState("");

  const generateVideo = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/generate",
        {
          topic
        }
      );

      setVideo(res.data.video);
      setScript(res.data.script);
    } catch (err) {
      console.error(err);
      alert("生成失败");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI 自动短视频工厂</h1>

      <textarea
        placeholder="输入视频主题"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button onClick={generateVideo}>
        {loading ? "生成中..." : "生成视频"}
      </button>

      {script && (
        <div className="card">
          <h2>生成脚本</h2>
          <p>{script}</p>
        </div>
      )}

      {video && (
        <video controls src={video} className="video" />
      )}
    </div>
  );
}