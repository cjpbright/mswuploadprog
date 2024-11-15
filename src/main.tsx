import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setupWorker } from "msw/browser";
import { uploadDocumentMocks } from "./upload/mock.ts";

const enableMSW = true;

async function prepare() {
  if (!enableMSW) {
    return Promise.resolve();
  }
  const rootUrl = window.location.hostname;

  const worker = setupWorker(...uploadDocumentMocks);

  const localRootUrl = `${window.location.protocol}//${rootUrl}:${window.location.port}`;
  const workerUrl = `${localRootUrl}/mockServiceWorker.js`;

  return worker.start({
    serviceWorker: {
      url: workerUrl,
      options: {
        scope: localRootUrl,
      },
    },
    // Ignore unhandled
    onUnhandledRequest: "bypass",
  });
}

const root = createRoot(document.getElementById("root")!);

// Complete prepare before rendering to ensure msw setup if required.
prepare().then(
  () => root.render(<App />),
  (error) => {
    root.render(
      <>
        Error while preparing app render!
        <br />
        {JSON.stringify(error)}
      </>
    );
  }
);
