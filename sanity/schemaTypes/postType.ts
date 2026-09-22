import { defineField, defineType } from 'sanity';

/**
 * The "post" document type — this is what shows up as "Post" in the
 * Studio sidebar (at /studio) for Senira to write in, no code required.
 * Front end reads these back via lib/sanity/queries.ts + lib/blog.ts.
 */
export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL for this post, e.g. "my-post" becomes /blog/my-post. Click "Generate" to fill this from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short 1–2 sentence teaser shown on the blog index, in link previews, and in the RSS feed.',
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Controls sort order on the blog page and the pubDate in the RSS feed.',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The full post content — write and format it here like a normal document.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'excerpt', media: 'coverImage' },
  },
});
