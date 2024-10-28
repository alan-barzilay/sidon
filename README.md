# Git repo for the nabisaydoun website

Built with astro and tailwind. I also used this to test bun, but it wasn't the best experience so any further development would be benefited from going back to npm/pnpm.
For more information on the subject of the site itself, please visit https://nabisaydoun.org/

To test locally:
```
npm install astro 
npm run dev      
```

To re-build english, french and portuguese translations (arabic translation in progress):
```
npx astro-i18next generate
```
