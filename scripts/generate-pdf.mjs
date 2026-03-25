import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, "..", "LandIQ-Pitch-Deck.pdf");

const TOTAL_SLIDES = 18;
const VIEWPORT = { width: 1440, height: 900 };

async function generatePDF() {
  console.log("🚀 Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  // Navigate to pitch deck
  console.log("📄 Loading pitch deck...");
  await page.goto("http://localhost:3000/landiq/pitch", {
    waitUntil: "networkidle2",
    timeout: 30000,
  });

  // Wait for initial animations
  await new Promise((r) => setTimeout(r, 3000));

  // Hide Next.js dev mode error overlay and indicators
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = `
      nextjs-portal, [data-nextjs-toast], [data-nextjs-dialog],
      #__next-build-indicator, [data-next-mark],
      div[style*="position: fixed"][style*="bottom"],
      button[data-nextjs-errors-count] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `;
    document.head.appendChild(style);
    // Also try to remove the element directly
    document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
  });

  // Capture each slide as screenshot
  const screenshots = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    console.log(`📸 Capturing slide ${i + 1}/${TOTAL_SLIDES}...`);

    // Wait for slide transition + animations
    await new Promise((r) => setTimeout(r, 2000));

    // Take screenshot
    const screenshot = await page.screenshot({
      type: "png",
      fullPage: false,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    });
    screenshots.push(screenshot);

    // Navigate to next slide (press ArrowRight)
    if (i < TOTAL_SLIDES - 1) {
      await page.keyboard.press("ArrowRight");
      await new Promise((r) => setTimeout(r, 1000)); // wait for transition
    }
  }

  // Create PDF from screenshots
  console.log("📑 Generating PDF...");
  const pdfPage = await browser.newPage();
  await pdfPage.setViewport(VIEWPORT);

  // Build HTML with all slides as full-page images
  const imagesHtml = screenshots
    .map((buf, i) => {
      const base64 = buf.toString("base64");
      return `
        <div class="slide" style="
          page-break-after: always;
          page-break-inside: avoid;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0D3423;
        ">
          <img src="data:image/png;base64,${base64}" style="
            width: 100%;
            height: 100%;
            object-fit: contain;
          " />
        </div>
      `;
    })
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; }
        @page { size: 1920px 1080px; margin: 0; }
        .slide:last-child { page-break-after: auto; }
      </style>
    </head>
    <body>${imagesHtml}</body>
    </html>
  `;

  await pdfPage.setContent(html, { waitUntil: "networkidle0" });

  await pdfPage.pdf({
    path: outputPath,
    width: "1440px",
    height: "900px",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`✅ PDF saved to: ${outputPath}`);
}

generatePDF().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
