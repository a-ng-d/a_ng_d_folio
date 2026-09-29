/**
 * Contenu des pages éditoriales, écrit en Markdown sous content/pages/.
 *
 * Plus léger que les projets : une page n'a ni ordre, ni publication, ni
 * décor — sa route est déclarée à la main dans le routeur. Seul son contenu
 * vient d'ici.
 */
const bodies = import.meta.glob('/content/pages/*/index.en.md', {
  eager: true,
  import: 'default',
})

export const pageBody = (slug: string) =>
  bodies[`/content/pages/${slug}/index.en.md`]
