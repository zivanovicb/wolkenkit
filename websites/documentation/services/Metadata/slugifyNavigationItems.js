import slugify from '../../services/slugify';

const slugifyNavigationItems = function (items) {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array.');
  }

  return items.map(item => {
    if (item.children) {
      return { ...item, slug: slugify(item.title), children: slugifyNavigationItems(item.children) };
    }

    return { ...item, slug: slugify(item.title) };
  });
};

export default slugifyNavigationItems;
