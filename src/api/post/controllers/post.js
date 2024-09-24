'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::post.post', ({ strapi }) => ({
  async find(ctx) {
    const posts = await strapi.db.query('api::post.post').findMany({
      orderBy: { id: 'asc' },
      populate: {
        image: true,
      },
    });

    console.log('All posts:', posts);

    return { data: posts };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    
    const post = await strapi.db.query('api::post.post').findOne({
      where: { id: parseInt(id) },
      populate: {
        image: true,
      },
    });

    console.log(`Post ${id}:`, post);

    if (!post) {
      return ctx.notFound('Post not found');
    }

    return { data: post };
  }
}));