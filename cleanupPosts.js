module.exports = async ({ strapi }) => {
    const posts = await strapi.entityService.findMany('api::post.post', {
      sort: { id: 'asc' },
    });
  
    let currentId = 1;
    for (const post of posts) {
      await strapi.entityService.update('api::post.post', post.id, {
        data: {
          id: currentId,
        },
      });
      currentId++;
    }
  
    console.log('Posts cleanup completed');
  };