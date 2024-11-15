import { useState } from "react";
import { uploadDocument } from "./upload/uploadHelper";
import { AxiosProgressEvent } from "axios";

function App() {
  const [file, setFile] = useState<File | null>(null);

  const [progCounter, setProgCounter] = useState<number>(0);

  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleProgress = (e: AxiosProgressEvent) => {
    if (e.lengthComputable && e.total) {
      const percent = (e.loaded / e.total) * 100;
      setProgCounter(percent);
    }
  };

  function submitFile() {
    if (!file) {
      return;
    }
    uploadDocument({
      targetFile: file,
      progressEvent: handleProgress,
      completeEvent: () => {
        setIsComplete(true);
      },
    });
  }

  function reset() {
    setProgCounter(0);
    setIsComplete(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      File:
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.item(0) || null)}
      />
      <div>
        <progress value={progCounter} max={100}></progress>
      </div>
      {isComplete && <div>Upload Complete!</div>}
      <div>
        <button onClick={submitFile}>Submit</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
