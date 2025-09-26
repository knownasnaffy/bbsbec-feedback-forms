# Feedback Form PDF Generator

This utility converts feedback submitted by the students, faculty members, and alumni of BBSBEC via online forms into PDF documents. These PDF forms can be presented as official alternatives to physical photocopies for higher authorities.

## Usage Instructions

### 1. Start the Static File Server for Images

Puppeteer does not allow loading local images directly from the filesystem in headless mode. To enable images in PDFs, you need to serve them via a local HTTP server.

In the directory containing your images (e.g., `logo.png`), run:

```sh
python -m http.server 3000
```

This will serve files on [http://localhost:3000](http://localhost:3000).

### 2. Setup Node.js Environment

Install all necessary packages defined in `package.json` using your preferred package manager:

```sh
bun install
# or
npm install
# or
yarn install
# or
pnpm install
```

### 3. Generate Student Feedback PDFs

Run this command to generate PDFs for student feedback forms:

```sh
bun students.ts
# or
npm run tsx students.ts
```

> Note: Running the TypeScript files may require you to setup TypeScript support manually if using `npm`.

### 4. Generate Faculty Feedback PDFs

Run the following to generate PDFs for faculty feedback forms:

```sh
bun faculty.ts
# or
npm run tsx faculty.ts
```

### 5. Generate Alumni Feedback PDFs

Use this command to generate PDFs for alumni feedback forms:

```sh
bun alumni.ts
# or
npm run tsx alumni.ts
```

***

### Additional Notes:
- Ensure your local server is running while generating PDFs to correctly load images.
- Modify port or file paths in the scripts if your setup differs.
- If you encounter issues with image loading, consider inlining images as base64 or configuring a static Express server.

This structured approach should make your utility clearer and easier to use for contributors or users.
