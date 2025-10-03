const path = require("path")

const getImagePath = (doc, outputDir) => {
  // doc.docPath may be a directory (usually) or a full path; handle both:
  const raw = doc.docPath || ""
  const docDir = raw.toLowerCase().endsWith(".md") ? path.dirname(raw) : raw

  // Place images in "<docDir>/asset"
  const dirPath = path.join(docDir, "assets")

  // Markdown should reference images with a relative prefix: "./asset"
  let prefixKey = path.relative(docDir, dirPath) || "."
  if (!prefixKey.startsWith(".")) prefixKey = `./${prefixKey}`
  // Normalize to POSIX-style slashes for Markdown
  prefixKey = prefixKey.split(path.sep).join("/")

  return { dirPath, prefixKey } // Elog will write files to dirPath and use prefixKey in Markdown
}

module.exports = { getImagePath }
