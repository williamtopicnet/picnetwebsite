# Setting Up

- `npm install`
- `npm run dev`

# Commands:

`npm run dev`: Starts local dev server at `localhost:3000`  
`npm run build`: Build your production site to `./dist/`  
`npm run preview`: Preview your build locally, before deploying

# Technical Details

- the home page is defined in `/pages/index.astro` and all child sections of the
  home page are in the `/pages/home-page-sections` folder
- all other pages have their own folder in the `/pages` directory, and their
  child sections are in the `sections` folder of their corresponding page
  directory
- all pages currently share a layout component, located in the
  `/layouts/Layout.astro` file
- any reuseable compoenent/widget lives in the `/components` directory. any page
  specific component should live inside the page's folder in the `/pages` directory
- all reuseable css is in the `/layouts/global.scss` file, try to use these variables
  where possible to define colours, font-sized, etc.

# Design Guidelines

- please keep css as clean as possible
- use modern css over old 'hacky' css, i.e. grid-layout vs float: left, etc.
- page must work in mobile and desktop. Breakpoint for mobile should be around
  780px width
- try to minimise the use of client-side javascript
- design does not need to exactly match current website, but must look professional
  on both desktop and mobile
- a new icon font library may be required as current icons require too many files
