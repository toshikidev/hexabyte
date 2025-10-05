// docs/.vitepress/config/sidebar.ts
export const vitePressSidebarOptions = [
  // English (default) sidebar
  {
    documentRootPath: 'docs',
    scanStartPath: 'memo',
    resolvePath: '/memo/',
    basePath: '/memo/',
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'review',
    resolvePath: '/review/',
    basePath: '/review/',
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'dev',
    resolvePath: '/dev/',
    basePath: '/dev/',
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  },
  // Chinese (zh) sidebar
  {
    documentRootPath: 'docs',
    scanStartPath: 'zh/memo',
    resolvePath: '/zh/memo/',
    basePath: '/zh/memo/',
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'zh/review',
    resolvePath: '/zh/review/',
    basePath: '/zh/review/',
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'zh/dev',
    resolvePath: '/zh/dev/',
    basePath: '/zh/dev/',
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
  },
]