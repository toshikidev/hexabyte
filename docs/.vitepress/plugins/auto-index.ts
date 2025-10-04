// .vitepress/plugins/auto-index.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function autoIndexPlugin() {
  function generateAllIndexes() {
    const docsRoot = path.resolve(process.cwd(), 'docs')

    function generateIndex(dir: string, folder: string) {
      const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'index.md')

      if (files.length === 0) return

      const links = files
        .map((f) => {
          const filePath = path.join(dir, f)
          const raw = fs.readFileSync(filePath, 'utf-8')
          const fm = matter(raw)

          const slug = f.replace(/\.md$/, '') // file name without extension
          const title = fm.data.title || slug

          // route-safe URL: /folder/slug (no .md)
          const url = `/${folder}/${encodeURIComponent(slug)}`

          return `- [${title}](${url})`
        })
        .join('\n')

      const indexPath = path.join(dir, 'index.md')

      // Always overwrite (rewrite every time)
      fs.writeFileSync(indexPath, `# Index of: ${folder}\n\n${links}\n`)

      console.log(`Auto-generated (rewritten): ${indexPath}`)
    }

    // Loop through each subfolder in /docs
    fs.readdirSync(docsRoot).forEach((folder) => {
      const dir = path.join(docsRoot, folder)
      if (fs.statSync(dir).isDirectory()) {
        generateIndex(dir, folder)
      }
    })
  }

  return {
    name: 'vitepress-auto-index',
    buildStart() {
      generateAllIndexes()
    },
    configureServer() {
      generateAllIndexes()
    }
  }
}
