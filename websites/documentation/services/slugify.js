const slugify = function (text) {
  if (typeof text !== 'string') {
    throw new Error('Text must be a string.');
  }

  return text.toLowerCase().replace(/ /gu, '-').
    replace(/[^A-Za-z0-9-]/gu, '');
};

export default slugify;
