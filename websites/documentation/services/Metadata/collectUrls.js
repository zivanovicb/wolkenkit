const collectUrls = function ({ from, parent, into, baseUrl } = {}) {
  if (!from) {
    throw new Error('From is missing.');
  }
  if (!parent) {
    throw new Error('Parent is missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }
  if (baseUrl === undefined) {
    throw new Error('Base url is missing.');
  }

  for (const item of from) {
    if (item.children) {
      return collectUrls({ from: item.children, parent: `${parent}/${item.slug}`, into, baseUrl });
    }
    if (!item.slug) {
      return;
    }
    into.push(`/${parent}/${item.slug}/`);
  }
};

export default collectUrls;
