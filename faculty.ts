import puppeteer from "puppeteer";
import fs from "fs";

const records = [
  {
    id: 1,
    name: "Barinderpreet Singh",
    department: "Computer Science and Engineering",
    responses: {
      "1": 5,
      "2": 4,
      "3": 5,
      "4": 5,
      "5": 5,
      "6": 3,
      "7": 5,
      "8": 4,
      "9": 5,
      "10": 4,
    },
    suggestion: "Good program",
  },
  {
    id: 2,
    name: "Amritpal Singh",
    department: "Computer Science and Engineering",
    responses: {
      "1": 5,
      "2": 4,
      "3": 5,
      "4": 3,
      "5": 5,
      "6": 4,
      "7": 5,
      "8": 4,
      "9": 5,
      "10": 4,
    },
    suggestion: "Great execution",
  },
];

function generateHTML(item: (typeof records)[0]): string {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My Web Page</title>
      <style>
        @layer properties;
        @layer theme, base, components, utilities;
        @layer theme {
          :root, :host {
            --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
              "Courier New", monospace;
            --color-black: #000;
            --spacing: 0.25rem;
            --text-lg: 1.125rem;
            --text-lg--line-height: calc(1.75 / 1.125);
            --text-xl: 1.25rem;
            --text-xl--line-height: calc(1.75 / 1.25);
            --font-weight-medium: 500;
            --font-weight-semibold: 600;
            --default-font-family: var(--font-sans);
            --default-mono-font-family: var(--font-mono);
          }
        }
        @layer base {
          *, ::after, ::before, ::backdrop, ::file-selector-button {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            border: 0 solid;
          }
          html, :host {
            line-height: 1.5;
            -webkit-text-size-adjust: 100%;
            tab-size: 4;
            font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
            font-feature-settings: var(--default-font-feature-settings, normal);
            font-variation-settings: var(--default-font-variation-settings, normal);
            -webkit-tap-highlight-color: transparent;
          }
          hr {
            height: 0;
            color: inherit;
            border-top-width: 1px;
          }
          abbr:where([title]) {
            -webkit-text-decoration: underline dotted;
            text-decoration: underline dotted;
          }
          h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
            font-weight: inherit;
          }
          a {
            color: inherit;
            -webkit-text-decoration: inherit;
            text-decoration: inherit;
          }
          b, strong {
            font-weight: bolder;
          }
          code, kbd, samp, pre {
            font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
            font-feature-settings: var(--default-mono-font-feature-settings, normal);
            font-variation-settings: var(--default-mono-font-variation-settings, normal);
            font-size: 1em;
          }
          small {
            font-size: 80%;
          }
          sub, sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
          }
          sub {
            bottom: -0.25em;
          }
          sup {
            top: -0.5em;
          }
          table {
            text-indent: 0;
            border-color: inherit;
            border-collapse: collapse;
          }
          :-moz-focusring {
            outline: auto;
          }
          progress {
            vertical-align: baseline;
          }
          summary {
            display: list-item;
          }
          ol, ul, menu {
            list-style: none;
          }
          img, svg, video, canvas, audio, iframe, embed, object {
            display: block;
            vertical-align: middle;
          }
          img, video {
            max-width: 100%;
            height: auto;
          }
          button, input, select, optgroup, textarea, ::file-selector-button {
            font: inherit;
            font-feature-settings: inherit;
            font-variation-settings: inherit;
            letter-spacing: inherit;
            color: inherit;
            border-radius: 0;
            background-color: transparent;
            opacity: 1;
          }
          :where(select:is([multiple], [size])) optgroup {
            font-weight: bolder;
          }
          :where(select:is([multiple], [size])) optgroup option {
            padding-inline-start: 20px;
          }
          ::file-selector-button {
            margin-inline-end: 4px;
          }
          ::placeholder {
            opacity: 1;
          }
          @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
            ::placeholder {
              color: currentcolor;
              @supports (color: color-mix(in lab, red, red)) {
                color: color-mix(in oklab, currentcolor 50%, transparent);
              }
            }
          }
          textarea {
            resize: vertical;
          }
          ::-webkit-search-decoration {
            -webkit-appearance: none;
          }
          ::-webkit-date-and-time-value {
            min-height: 1lh;
            text-align: inherit;
          }
          ::-webkit-datetime-edit {
            display: inline-flex;
          }
          ::-webkit-datetime-edit-fields-wrapper {
            padding: 0;
          }
          ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
            padding-block: 0;
          }
          ::-webkit-calendar-picker-indicator {
            line-height: 1;
          }
          :-moz-ui-invalid {
            box-shadow: none;
          }
          button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
            appearance: button;
          }
          ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
            height: auto;
          }
          [hidden]:where(:not([hidden="until-found"])) {
            display: none !important;
          }
        }
        @layer utilities {
          .mx-auto {
            margin-inline: auto;
          }
          .-mt-0 {
            margin-top: calc(var(--spacing) * -0);
          }
          .-mt-0\.5 {
            margin-top: calc(var(--spacing) * -0.5);
          }
          .mt-1 {
            margin-top: calc(var(--spacing) * 1);
          }
          .mt-4 {
            margin-top: calc(var(--spacing) * 4);
          }
          .flex {
            display: flex;
          }
          .grid {
            display: grid;
          }
          .table {
            display: table;
          }
          .size-20 {
            width: calc(var(--spacing) * 20);
            height: calc(var(--spacing) * 20);
          }
          .w-full {
            width: 100%;
          }
          .max-w-\[50rem\] {
            max-width: 50rem;
          }
          .flex-grow {
            flex-grow: 1;
          }
          .grow {
            flex-grow: 1;
          }
          .border-collapse {
            border-collapse: collapse;
          }
          .resize {
            resize: both;
          }
          .items-center {
            align-items: center;
          }
          .justify-between {
            justify-content: space-between;
          }
          .gap-1 {
            gap: calc(var(--spacing) * 1);
          }
          .gap-2 {
            gap: calc(var(--spacing) * 2);
          }
          .gap-3 {
            gap: calc(var(--spacing) * 3);
          }
          .border {
            border-style: var(--tw-border-style);
            border-width: 1px;
          }
          .border-t-1 {
            border-top-style: var(--tw-border-style);
            border-top-width: 1px;
          }
          .border-b {
            border-bottom-style: var(--tw-border-style);
            border-bottom-width: 1px;
          }
          .border-b-4 {
            border-bottom-style: var(--tw-border-style);
            border-bottom-width: 4px;
          }
          .border-black {
            border-color: var(--color-black);
          }
          .px-4 {
            padding-inline: calc(var(--spacing) * 4);
          }
          .px-8 {
            padding-inline: calc(var(--spacing) * 8);
          }
          .px-16 {
            padding-inline: calc(var(--spacing) * 16);
          }
          .py-2 {
            padding-block: calc(var(--spacing) * 2);
          }
          .py-4 {
            padding-block: calc(var(--spacing) * 4);
          }
          .pt-2 {
            padding-top: calc(var(--spacing) * 2);
          }
          .pt-6 {
            padding-top: calc(var(--spacing) * 6);
          }
          .pt-12 {
            padding-top: calc(var(--spacing) * 12);
          }
          .pb-4 {
            padding-bottom: calc(var(--spacing) * 4);
          }
          .text-center {
            text-align: center;
          }
          .text-end {
            text-align: end;
          }
          .text-lg {
            font-size: var(--text-lg);
            line-height: var(--tw-leading, var(--text-lg--line-height));
          }
          .text-xl {
            font-size: var(--text-xl);
            line-height: var(--tw-leading, var(--text-xl--line-height));
          }
          .leading-5 {
            --tw-leading: calc(var(--spacing) * 5);
            line-height: calc(var(--spacing) * 5);
          }
          .font-medium {
            --tw-font-weight: var(--font-weight-medium);
            font-weight: var(--font-weight-medium);
          }
          .font-semibold {
            --tw-font-weight: var(--font-weight-semibold);
            font-weight: var(--font-weight-semibold);
          }
          .text-nowrap {
            text-wrap: nowrap;
          }
          .text-wrap {
            text-wrap: wrap;
          }
          .text-transparent {
            color: transparent;
          }
          .underline {
            text-decoration-line: underline;
          }
          .outline {
            outline-style: var(--tw-outline-style);
            outline-width: 1px;
          }
        }
        html {
          font-family: "Times New Roman";
        }
        th, td {
          border-style: var(--tw-border-style);
          border-width: 1px;
          padding-inline: calc(var(--spacing) * 2);
          padding-block: calc(var(--spacing) * 0.5);
          --tw-leading: calc(var(--spacing) * 4);
          line-height: calc(var(--spacing) * 4);
        }
        @property --tw-border-style {
          syntax: "*";
          inherits: false;
          initial-value: solid;
        }
        @property --tw-leading {
          syntax: "*";
          inherits: false;
        }
        @property --tw-font-weight {
          syntax: "*";
          inherits: false;
        }
        @property --tw-outline-style {
          syntax: "*";
          inherits: false;
          initial-value: solid;
        }
        @layer properties {
          @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
            *, ::before, ::after, ::backdrop {
              --tw-border-style: solid;
              --tw-leading: initial;
              --tw-font-weight: initial;
              --tw-outline-style: solid;
            }
          }
        }
      </style>
  </head>
    <body class="px-8 max-w-[50rem] mx-auto">
      <header class="flex justify-between items-center pb-4 border-b-4 border-black">
        <img src="http://localhost:3000/logo.png" alt="Logo" class="size-20" />
        <h1 class="text-end text-xl font-medium">
          BABA BANDA SINGH BAHADUR ENGINEERING COLLEGE<br />FATEHGARH SAHIB
        </h1>
      </header>
      <main class="border-t-1 border-black mt-1 py-4">
        <h2 class="text-center font-semibold text-xl">Faculty Feedback on Curriculum</h2>
        <h3 class="text-center text-lg -mt-0.5">Session 2024-2025</h3>
        <p class="pt-2 leading-5">
          <b>NOTE:</b> To be submitted by the faculty at the end of an academic year with respect to the cumulative experience of the curriculum of the program to the respective Head of the Department
        </p>
        <div class="flex items-center gap-3 text-lg py-2 px-4">
          <div class="grid gap-2">
            <b>1. Name of the Faculty Member</b>
            <b>2. Department</b>
          </div>
          <div class="grid grow gap-2">
            <span class="border-b">${item.name}</span>
            <span class="border-b">${item.department}</span>
          </div>
        </div>
        <p class="pt-2 leading-5">
          Kindly rate the following perspectives of curriculum being followed by the college, by putting a tick mark in appropriate cell, on the basis of your experience in the program till date. Any commend on a particular subject may please be mentioned in the comments/suggestions section.
        </p>
        <table class="mt-4" border="1" cellspacing="0" cellpadding="6">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Particulars</th>
              <th>Excellent</th>
              <th>Very Good</th>
              <th>Good</th>
              <th>Moderate</th>
              <th>Poor</th>
            </tr>
          </thead>
          <tbody>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .map(
                (i) => `
              <tr>
                <td class="center">${i}</td>
                <td>${
                  [
                    "The aptness of the learning objects of the program.",
                    "The organization of the syllabi and its appropriateness to the program.",
                    "The suitability of the text books and reference books to the courses.",
                    "The effectiveness of feedback submitted by the faculty to the university wrt design and development of syllabi.",
                    "Distribution of contact hours among the course components.",
                    "The balance between theory and practical courses/training in the curriculum.",
                    "The quality of elective subjects offered in terms of technological advancements.",
                    "The aptness of modern tools taught in higher education or career.",
                    "Communication skills imparted to effectively communicate and give / receive clear instructions.",
                    "Ability to assess societal, health, safety, legal and cultural issues and the associated responsibilities.",
                  ][i - 1]
                }</td>
                ${[5, 4, 3, 2, 1]
                  .map(
                    (score) => `
                  <td class="text-center">${item.responses[i.toString()] === score ? "✓" : ""}</td>
                `,
                  )
                  .join("")}
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        <p class="mt-4"><b>Suggestions for further improvement:</b></p>
        <div class="grid pt-2 gap-1">
          <span class="border-b border-black">${item.suggestion || ""}</span>
        </div>
      </main>
    </body>
  </html>
  `;
}

async function generatePdf() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  fs.mkdirSync("faculty", { recursive: true });

  records.forEach(async (record, index) => {
    const page = await browser.newPage();

    // Generate the complete HTML content with injected data
    const content = generateHTML(record);

    // Set HTML content into the page
    await page.setContent(content, { waitUntil: "networkidle0" });

    // Emulate screen media (important for screen CSS styles)
    await page.emulateMediaType("screen");

    // Generate PDF with options similar to your expected output
    await page.pdf({
      path: `faculty/${record.id}.pdf`,
      format: "A4",
      printBackground: true,
      margin: { top: "50px", bottom: "50px", left: "40px", right: "40px" },
    });

    await page.close();

    if (index === records.length - 1) {
      await browser.close();
    }
  });
}

generatePdf().catch(console.error);
