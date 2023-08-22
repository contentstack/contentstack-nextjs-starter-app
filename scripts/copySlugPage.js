const fs = require('fs')

require('dotenv').config()

if (process.env.NEXT_USE_SSR === '1') {
  fs.copyFileSync(
    './src/templates/[[...slug]].ssr.tsx',
    './src/pages/[[...slug]].tsx'
  )
} else {
  fs.copyFileSync(
    './src/templates/[[...slug]].ssg.tsx',
    './src/pages/[[...slug]].tsx'
  )
}
