const bodies = import.meta.glob('/content/pages/*/index.en.md', {
  eager: true,
  import: 'default',
})

export const pageBody = (slug: string) =>
  bodies[`/content/pages/${slug}/index.en.md`]
