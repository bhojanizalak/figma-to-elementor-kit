This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploying Your Web Agent to Vercel

Follow these steps to make your Figma-to-Elementor Kit Generator available online for anyone to use:

### 1. Push Your Project to GitHub

If you haven't already:

```sh
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/figma-to-elementor-kit.git
git push -u origin main
```

### 2. Create a Free Vercel Account
- Go to [https://vercel.com/signup](https://vercel.com/signup) and sign up (you can use your GitHub account).

### 3. Import Your GitHub Repo to Vercel
- Click **"Add New Project"**.
- Select your `figma-to-elementor-kit` repo.
- Vercel will auto-detect it's a Next.js app. Just click **"Deploy"**.

### 4. Wait for Build & Get Your Public URL
- After a minute or two, your app will be live at a URL like:
  - `https://figma-to-elementor-kit.vercel.app`
- Share this link with your team—anyone can use the web agent!

### 5. (Optional) Custom Domain
- In Vercel, you can add a custom domain if you want.

---

## Security Note
- Users enter their own Figma API tokens—no secrets are stored on your server.
- For extra security or to restrict access, consider adding authentication (see NextAuth.js or Vercel Protect).

---

## Local Development
To run locally:
```sh
npm install
npm run dev
```
Then visit [http://localhost:3000](http://localhost:3000)

---

## Questions or Issues?
Open an issue or PR on GitHub, or contact the maintainer.
