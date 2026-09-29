import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Plugin } from 'vite'
import type { WorkProject } from '../src/content/types'

const VIRTUAL_ID = 'virtual:work-content'
const RESOLVED_ID = '\0' + VIRTUAL_ID

const CONTENT_DIR = 'content/work'
const FILE_RE = /^index\.([a-z]{2})\.md$/

// Les huit projets partagent aujourd'hui la même scénographie. Elle devient
// donc un défaut : une frontmatter n'a à la déclarer que pour en dévier.
const DEFAULT_SCENERY = {
  disposition: 'DUNES',
  flow: 'STILL',
  ambient: 'grayscale',
  shape: 'ROUND',
  live: true,
  wireframe: true,
}

const THEMES = ['DEFAULT', 'DARK']
const TINT_FIELDS = [
  'hue',
  'brightness',
  'invert',
  'saturation',
  'grayscale',
  'name',
]

const fail = (file: string, message: string): never => {
  throw new Error(`[work-content] ${file} : ${message}`)
}

const TEXT_FIELDS = [
  'title',
  'shortTitle',
  'summary',
  'description',
  'date',
  'type',
  'objectives',
  'roles',
]

const readProject = (dir: string, root: string): WorkProject => {
  const slug = path.basename(dir)
  const files = fs.readdirSync(dir).filter((f) => FILE_RE.test(f))
  if (files.length === 0)
    fail(path.relative(root, dir), 'aucun fichier index.<locale>.md')

  const locales = files
    .map((f) => (f.match(FILE_RE) as RegExpMatchArray)[1])
    .sort()
  // La locale de base porte la configuration ; les autres ne traduisent que
  // le texte. 'en' si elle existe, sinon la première par ordre alphabétique.
  const baseLocale = locales.includes('en') ? 'en' : locales[0]
  const basePath = path.join(dir, `index.${baseLocale}.md`)
  const rel = path.relative(root, basePath)

  const parsed = matter(fs.readFileSync(basePath, 'utf-8'))
  const fm = parsed.data as Record<string, unknown>

  if (typeof fm.published !== 'boolean')
    fail(rel, '`published` est obligatoire et doit être true ou false')
  if (typeof fm.order !== 'number' || Number.isNaN(fm.order))
    fail(rel, '`order` est obligatoire et doit être un nombre')

  const theme = (fm.theme as string) ?? 'DEFAULT'
  if (!THEMES.includes(theme))
    fail(rel, `\`theme\` vaut "${theme}" — attendu ${THEMES.join(' ou ')}`)

  if (typeof fm.illustration !== 'string' || fm.illustration.length === 0)
    fail(rel, '`illustration` est obligatoire (nom de fichier)')
  const illustration = fm.illustration as string

  const tint = (fm.tint ?? {}) as Record<string, string>
  const missing = TINT_FIELDS.filter((f) => typeof tint[f] !== 'string')
  if (missing.length > 0)
    fail(
      rel,
      `\`tint\` : champ(s) manquant(s) ou non textuel(s) — ${missing.join(
        ', '
      )}`
    )

  const text: Record<string, unknown> = {}
  for (const field of TEXT_FIELDS)
    if (fm[field] !== undefined) text[field] = fm[field]

  return {
    slug,
    published: fm.published as boolean,
    order: fm.order as number,
    theme,
    illustration: {
      kind: illustration.endsWith('.json') ? 'lottie' : 'image',
      file: illustration,
    },
    backgroundImage: (fm.backgroundImage as string) ?? 'none',
    tint,
    scenery: { ...DEFAULT_SCENERY, ...((fm.scenery ?? {}) as object) },
    locales,
    hasBody: parsed.content.replace(/<!--[\s\S]*?-->/g, '').trim().length > 0,
    text,
  } as WorkProject
}

const collect = (root: string): WorkProject[] => {
  const base = path.join(root, CONTENT_DIR)
  if (!fs.existsSync(base)) return []

  const projects = fs
    .readdirSync(base, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => readProject(path.join(base, e.name), root))

  const seen = new Set<number>()
  for (const p of projects) {
    if (seen.has(p.order))
      // Non bloquant : le tri secondaire sur le slug garde un ordre stable.
      console.warn(`[work-content] ordre ${p.order} en double (${p.slug})`)
    seen.add(p.order)
  }

  return projects.sort(
    (a, b) => a.order - b.order || a.slug.localeCompare(b.slug)
  )
}

export const workContent = (): Plugin => {
  let root = process.cwd()

  return {
    name: 'work-content',

    configResolved(config) {
      root = config.root
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    load(id) {
      if (id !== RESOLVED_ID) return
      const projects = collect(root)
      return `export const projects = ${JSON.stringify(projects, null, 2)}\n`
    },

    configureServer(server) {
      const base = path.join(root, CONTENT_DIR)
      server.watcher.add(base)

      const invalidate = (file: string) => {
        if (!file.startsWith(base)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', invalidate)
      server.watcher.on('change', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}

export default workContent
