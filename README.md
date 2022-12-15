# Setting Up

- `npm install`
- `npm run dev`

# Commands:

`npm run dev`: Starts local dev server at `localhost:3000`  
`npm run build`: Build your production site to `./dist/`  
`npm run preview`: Preview your build locally, before deploying

# Project structure

- `public/` folder is for the images and fonts. This folder includes:

  - `font/`
    - `fontawesome/`: css and font family of icons
  - `images/`
    - `hero/`: images for the hero section in each pages
    - `customers/`: images for all of the brand, partners and customers
    - `home/`, `application-integration-services/`, `artificial-intelligence/`,...: folders for page specific images

- `src/` folder is the code:

  - `components/`: reuseable components to use
  - `data/`: static data for sections in pages as `json`
  - `layouts/`:
    - The main layout of the website
    - Also have its own components
  - `scripts/`: for reusable scripts of JS module, you can use it by importing
  - `utils/`: includes utilites like enums and types for reusable perposes
  - `styles/`:
    - For scss and css files. (There is only `scss/` folder now, maybe you want to add some normal css later so I just keep it this way)
    - For the `scss` structure:
      - `components/`: reusable component classes such as `.section` & `.container`
      - `base-var.scss`: base variables such as `$base` for spacing, `$base-box-shadow`, `$base-radius`...
      - `colors.scss`: color variables are here (sorry for the naming, I haven't figured out a way to make them more meaningful)
      - `index.scss`: this is the main file in which I inlcudes all others `.scss` files
      - `typography.scss`: for `$font` var and font-size vars:
        - `$text-sm`
        - `$text-base`
        - `$text-md`
        - `$text-lg`
        - `$text-xl`
        - `$text-2xl`
        - `$text-3xl`
        - `$text-4xl`
    - `utils.scss`: utility classes for repeated styles:
      - `.text-underline`: create underline for text
      - `img` of responsive image class
      - `text-center`: center text
  - `pages/`:
    - The home page is defined in `/pages/index.astro` and all child sections of the
      home page are in the `/pages/home-page-sections` folder
    - All other pages have their own folder in the `/pages` directory, and their
      child sections are in the `sections` folder of their corresponding page
      directory

# Techincal Notes

- For the scss variables, I didn't import `.scss` to use variables inside `style` block of `.astro` file. I decided to use css variable and declare them at the `:root` (I did this in the `.index.scss` & import it in the `Layout.astro`) so in the `.astro` file, I just write `var(--color-white)`
- For the `section` there is a `.section`, `.section__header`, `.section__title`, `.section__subtitle` classes to use;
- I used 1 `.container` class with the max-width of 1200px
- There is only 1 break-point: `780px`
- I used both `grid` and `flex`
- I also set up [import alias](https://docs.astro.build/en/guides/aliases/):
  - The relative paths in the `tsconfig.json` file so the import path looks prettier: `@data/home/case-studies.json`
  - The relative paths for `styles` folder so you could import it like this `@styles/[folder name or file name]`
- For the icons: I loaded them locally in `/public/font`
- For the font family (Poppins): I use [google fonts](https://fonts.google.com/specimen/Poppins?query=poppin)
- I also use the `normalize.css` and load it with cdn
- All of `.css` file and google font loading are [defered](https://web.dev/defer-non-critical-css/)
- For the case studies tabs, just include the `tabs.ts` modules and init it with the id of the section. For example:

```
<script>
  import { initTab } from '@scripts/tab';

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTab === 'function') {
      initTab('case-studies');
    }
  });
</script>

<ServiceCaseStudySection
  title="Some of our Case Studies"
  subtitle="OUR COMMITMENT TO QUALITY"
  data={caseStudiesData}
  id="case-studies"
/>
```

# MISC

- If you use VS Code for this project, please install [this extension](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables), it gives you css variables intellisense
- I also installed [prettier](https://prettier.io/) to format the code
