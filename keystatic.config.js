// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'segi3',
      name: 'keystatic-app'
  }  
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'data/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Set this post as draft to prevent it from being published'
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});