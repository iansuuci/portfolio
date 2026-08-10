import * as pdfjsLib from "pdfjs-dist/build/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "../../node_modules/pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

async function renderThumbnail(canvas) {
  const url = canvas.dataset.pdf;
  if (!url) return;

  const pdf = await pdfjsLib.getDocument({
    url,
    disableRange: true,
    disableStream: true,
    disableAutoFetch: true,
  }).promise;
  const page = await pdf.getPage(1);

  const scale = 2;
  const viewport = page.getViewport({ scale });
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: canvas.getContext("2d"), viewport })
    .promise;
}

export default function initPaperPreviews() {
  document.querySelectorAll(".paper-wrapper__canvas").forEach((canvas) => {
    renderThumbnail(canvas).catch((error) => {
      console.error(
        `Failed to render PDF preview for ${canvas.dataset.pdf}`,
        error
      );
      const fallback = document.createElement("p");
      fallback.className = "paper-wrapper__canvas-fallback";
      fallback.textContent = "Preview unavailable — use the arXiv link above.";
      canvas.replaceWith(fallback);
    });
  });
}
