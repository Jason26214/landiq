import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, "..", "LandIQ-Brochure.pdf");

const TOTAL_PAGES = 8;
const A4 = { width: 595, height: 842 };

async function generateBrochurePDF() {
  console.log("🚀 Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 595, height: 842, deviceScaleFactor: 3 });

  console.log("📄 Loading brochure...");
  await page.goto("http://localhost:3000/landiq/brochure", {
    waitUntil: "networkidle2",
    timeout: 30000,
  });

  await new Promise((r) => setTimeout(r, 3000));

  // Hide Next.js dev overlay and navigation chrome
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
    document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
  });

  const screenshots = [];

  for (let i = 0; i < TOTAL_PAGES; i++) {
    console.log(`📸 Capturing page ${i + 1}/${TOTAL_PAGES}...`);

    if (i > 0) {
      // Click "Next" button
      await page.evaluate(() => {
        const buttons = document.querySelectorAll("button");
        for (const btn of buttons) {
          if (btn.textContent.includes("Next")) {
            btn.click();
            break;
          }
        }
      });
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Capture just the A4 page element by id
    const pageEl = await page.$("#a4-page");
    const screenshot = await pageEl.screenshot({ type: "png" });
    screenshots.push(screenshot);
  }

  // Build PDF from screenshots
  console.log("📑 Generating PDF...");
  const pdfPage = await browser.newPage();

  const imagesHtml = screenshots
    .map((buf) => {
      const base64 = buf.toString("base64");
      return `
        <div class="page" style="
          page-break-after: always;
          page-break-inside: avoid;
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
          overflow: hidden;
        ">
          <img src="data:image/png;base64,${base64}" style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
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
        @page { size: A4 portrait; margin: 0; }
        .page:last-child { page-break-after: auto; }
      </style>
    </head>
    <body>${imagesHtml}</body>
    </html>
  `;

  await pdfPage.setContent(html, { waitUntil: "networkidle0" });

  await pdfPage.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`✅ PDF saved to: ${outputPath}`);
}

generateBrochurePDF().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
