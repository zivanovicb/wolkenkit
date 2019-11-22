import Link from 'next/link';
import path from 'path';
import React from 'react';
import { Link as StyledLink } from 'thenativeweb-ux';
import { usePageContext } from '..';

const CustomLink = ({ as, href, children, className }) => {
  if (
    href.startsWith('http:') ||
    href.startsWith('https:') ||
    href.startsWith('mailto:')
  ) {
    return (
      <StyledLink href={ href } className={ className } isExternal={ true }>{ children }</StyledLink>
    );
  }

  let absolutePath = href;

  const { activePage } = usePageContext();
  const { language, version, section, chapter, page } = activePage;
  const pagePath = `/${language}/${version}/${section}/${chapter}/${page}/`;

  absolutePath = path.resolve(pagePath, href);

  return (
    <Link href={ absolutePath } as={ as }><a className={ className }>{ children }</a></Link>
  );
};

export default CustomLink;
