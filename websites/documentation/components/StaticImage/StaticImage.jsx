import PropTypes from 'prop-types';
import React from 'react';
import { usePageContext } from '..';
import { classNames, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  StaticImage: {
    marginTop: theme.space(4),
    maxWidth: `${theme.pageContent.maxWidth}px`
  },

  VariantWide: {
    maxWidth: `${theme.pageContent.maxWidth + theme.space(20)}px`
  }
});

const StaticImage = React.memo(({ classes, alt, src, variant } = {}) => {
  const { activePage } = usePageContext();
  const { language, version, section, chapter, page } = activePage;
  const completeSrc = `/static/${language}/${version}/${section}/${chapter}/${page}/${src}`;
  const componentClasses = classNames(classes.StaticImage, {
    [classes.VariantWide]: variant === 'wide'
  });

  return <img className={ componentClasses } alt={ alt } src={ completeSrc } />;
});

StaticImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  variant: PropTypes.oneOf([ null, 'wide' ])
};

export default withStyles(styles)(StaticImage);
