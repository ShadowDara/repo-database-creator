<!-- written by Shadowdara -->

<!--

Max Table:
/api/repos?id=true&user=shadowdara&raw=true&show_user=true&language=true&description=true&link=true

-->

# Repository Database Creator

<!--

***Check it out [here](https://repo-database-creator.vercel.app/api/repos?user=weuritz8u&raw=false) for User `weuritz8u`***

*I need to restructure this Readme soon!*

-->

*fetching the Github API the generate some stats!*

## Showcase

![Shadowdara's Repository Count Card](https://repo-database-creator.vercel.app/api/svg/repo_count?user=shadowdara&theme=daras_green)
![Shadowdara's Gist Count Card](https://repo-database-creator.vercel.app/api/svg/gist_count?user=shadowdara&theme=daras_green)

![Shadowdara's Account Age Card](https://repo-database-creator.vercel.app/api/svg/age_medal?user=shadowdara)
![weuritz8u's Account Age Card](https://repo-database-creator.vercel.app/api/svg/age_medal?user=weuritz8u)


## Index
- [Showcase](#showcase)
- [SVGs](#svgs)
    - [SVG Arguments](#svg-arguments)
    - [Repository Count Card](#repository-count-card)
    - [Gist Count Card](#gist-count-card)
    - [Account Age Card](#account-age-card)
- [All Themes here!!!](#all-themes-here)
- [Infos](#infos)
    - [Project Roadmap](#project-roadmap)
- [Contributing](#contributing)

## SVGs


### SVG Arguments

<table>
    <tr>
        <th>Argument</th>
        <th>Description</th>
        <th>Variable Type</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td><code>user</code></td>
        <td>the Users Github Username</td>
        <td>String</td>
        <td>shadowdara</td>
    </tr>
    <tr>
        <td><code>theme</code></td>
        <td>Theme Style for the SVG</td>
        <td>String</td>
        <td>default</td>
    </tr>
</table>

---


### Repository Count Card

A SVG Picture which shows the public Repositorys of a Githubuser

```
![](https://repo-database-creator.vercel.app/api/svg/repo_count?user=shadowdara)
```

![Shadowdara's Repository Count Card](https://repo-database-creator.vercel.app/api/svg/repo_count?user=shadowdara)

---


### Gist Count Card

A SVG Picture which shows the public Gists of a Githubser

```
![](https://repo-database-creator.vercel.app/api/svg/gist_count?user=shadowdara)
```

![Shadowdara's Gist Count Card](https://repo-database-creator.vercel.app/api/svg/gist_count?user=shadowdara)

---


### Account Age Card

A SVG Picture which shows the age of the Account of a Githubser

```
![](https://repo-database-creator.vercel.app/api/svg/age_medal?user=shadowdara)
```

![Shadowdara's Account Age Card](https://repo-database-creator.vercel.app/api/svg/age_medal?user=shadowdara)

---


## [All Themes here!!!](app/lib/README.md)

---


## Infos

- we use caching to prevent server usage *(24 hours)*


### Project Roadmap

- [X] Repair the caching!!!
- [ ] Cache is now again on Day but i want the cache the SVG pictures directly now!
- [ ] make the Readme file
- [ ] add more themes
- [ ] more link arguments
- [ ] more svgs
- [ ] better documentation
- [ ] add token for 5k Requests per hour
- [ ] add better project Icon
- [ ] create a 2nd theme readme without tables for mobile
- [x] added 6 color Gradient
- [ ] add wave  background gradient


## Contributing

Contributing to this project is ofcourse apreciated! For more infos read [Contributing.md](INFOS/CONTRIBUTING.md)

---

## Raw Repopository CSV Table

## Full Table Head
<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Owner Name</th>
        <th>Language</th>
        <th>Description</th>
        <th>Link</th>
    </tr>
</table>


### Arguments

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
        <td><code>&user=shadowdara</code></td>
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
        <td><code>&id=false</code></td>
        <td>x</td>
        <td>x</td>
        <td>Boolean</td>
    </tr>
    <tr>
        <td><code>show_name=true</code></td>
        <td>x</td>
        <td>x</td>
        <td>Boolean</td>
    </tr>
    <tr>
        <td><code>&show_user=false</code></td>
        <td>to display the Repository Owner Name</td>
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
    <tr>
        <td><code>&link=true</code></td>
        <td>to display the Repository link</td>
        <td>x</td>
        <td>Boolean</td>
    </tr>
</table>


## All Arguments

<table>
<tr>
        <th>Argument</th>
        <th>Description</th>
        <th>Variable Type</th>
        <th>Available in</th>
        <th>Default</th>
    </tr>
    <tr>
        <td><code>user</code></td>
        <td>x</td>
        <td>x</td>
        <td>String</td>
        <td>shadowdara</td>
    </tr>
    <tr>
        <td><code>description</code></td>
        <td>x</td>
        <td>x</td>
        <td>Boolean</td>
        <td>true</td>
    </tr>
    <tr>
        <td><code>language</code></td>
        <td>x</td>
        <td>x</td>
        <td>Boolean</td>
        <td>true</td>
    </tr>
    <tr>
        <td><code>show_name</code></td>
        <td>x</td>
        <td>x</td>
        <td>Boolean</td>
        <td>true</td>
    </tr>
    <tr>
        <td><code>show_user</code></td>
        <td>x</td>
        <td>x</td>
        <td>Boolean</td>
        <td>false</td>
    </tr>
    <tr>
        <td><code>link</code></td>
        <td>x</td>
        <td>x</td>
        <td>Boolean</td>
        <td>false</td>
    </tr>
    <tr>
        <td><code>id</code></td>
        <td>x</td>
        <td>x</td>
        <td>Boolean</td>
        <td>false</td>
    </tr>
    <tr>
        <td><code>theme</code></td>
        <td>x</td>
        <td>x</td>
        <td>String</td>
        <td>default</td>
    </tr>
</table>


## Dev open

<a href="https://repo-database-creator.vercel.app/api/repos_raw">Main Page</a>
<a href="https://repo-database-creator-git-test-deployment-shadowdaras-projects.vercel.app/api/repos_raw">Test Deployment</a>

---


### [Why is here Python](readme_autocreate/README.md)

- This should be replace soon with javascript but i am currently to lazy
to do that :(

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



<!--

=================================================================================================

-->



<!--

DEV NOTES

timer wird ausgeführt wenn data request kommt!

think about cron jobs again, because just once a day!

Maybe:

- 2nd Vercel Server for the cache
- always updating to neon or a redis probaly (not sure if the dataflow will be to big for neon)

-->