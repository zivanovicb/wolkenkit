const collectBreadcrumbs = function ({ language, children, path, into } = {}) {
  if (!children) {
    return [];
  }
  if (!language) {
    throw new Error('Language is missing.');
  }
  if (!path) {
    throw new Error('Path is missing.');
  }
  if (!children) {
    throw new Error('Children are missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }

  const item = children.find(child => child.slug === path[0]);

  if (!item) {
    return;
  }

  into.push(item.title);

  if (!item.children || path.length === 1) {
    return;
  }

  collectBreadcrumbs({
    language,
    children: item.children,
    path: path.slice(1),
    into
  });
};

export default collectBreadcrumbs;
