<!-- written by Shadowdara -->

# Repository Database Creator

***Check it out [here](https://repo-database-creator.vercel.app/api/repos?user=weuritz8u&raw=false) for User `weuritz8u`***

*I need to restructure this Readme soon!*

## Infos

- we use caching to prevent server usage *(16,6 hours)*

## Arguments

The content after the `=` in the table is the standard
value when the argument is not given!

<table>
    <tr>
        <th>Argument</th>
        <th>Description</th>
        <th>Showcase</th>
        <th>Variable Type</th>
    </tr>
    <tr>
        <td><code>&user=weuritz8u</code></td>
        <td>x</td>
        <td>x</td>
        <td>String</td>
    </tr>
    <tr>
        <td><code>&raw=true</code></td>
        <td>to display the output as an raw csv file, <i>(redirecting to api/repos_raw)</i></td>
        <td>x</td>
        <td>Boolean</td>
    </tr>
    <tr>
        <td><code>&language=true</code></td>
        <td>to display the Repository Language</td>
        <td>x</td>
        <td>Boolean</td>
    </tr>
    <tr>
        <td><code>&description=true</code></td>
        <td>to display the Repository Description</td>
        <td>x</td>
        <td>Boolean</td>
    </tr>
</table>

## Repo Count SVG

`[https://repo-database-creator.vercel.app/api/svg/repo_count?user=shadowdara](https://repo-database-creator.vercel.app/api/svg/repo_count?user=shadowdara)`

## Dev open

<a href="https://repo-database-creator.vercel.app/api/repos_raw">Main Page</a>
<a href="https://repo-database-creator-git-test-deployment-shadowdaras-projects.vercel.app/api/repos_raw">Test Deployment</a>

---

# Old Reademe Part (i am not finished yet)

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
