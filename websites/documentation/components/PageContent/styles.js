import color from 'color';

const tableCellPadding = '8px 8px 10px 8px';

const styles = theme => ({
  PageContent: {
    width: theme.contentWidth,
    marginLeft: theme.sidebarWidth,
    background: theme.color.content.background,

    '& > *': {
      width: theme.contentWidth
    }
  },

  Article: {
    padding: [ 0, theme.space(6) ],
    fontSize: theme.font.size.lg,

    '& a': {
      fontWeight: 400
    },

    '& p, ul, ol': {
      maxWidth: `${theme.pageContent.maxWidth}px`,
      fontWeight: 300,
      color: theme.color.copyText
    },

    '& p': {
      margin: [ theme.space(2), 0 ]
    },

    '& img': {
      marginTop: theme.space(4),
      width: '100%'
    },

    '& pre, code': {
      fontFamily: theme.font.family.code
    },

    '& p code, & ul li code, & table code': {
      padding: '0.25em 0.3em',
      backgroundColor: color(theme.color.brand.highlight).
        fade(0.9).
        rgb().
        string(),
      borderRadius: 0,
      fontSize: theme.font.size.md
    },

    '& ul': {
      margin: '0.5em 0 1em 0em',
      padding: 0,
      paddingLeft: '1em',
      'text-indent': '-0.85em',

      '& ul': {
        marginLeft: '1.5em'
      },

      '& li': {
        margin: 0,
        padding: 0,
        paddingBottom: '0.25em',
        'list-style-type': 'none'
      },

      '& li:before': {
        marginRight: '0.5em',
        content: '"\\2022"'
      }
    },

    '& table': {
      width: '100%',
      maxWidth: `${theme.pageContent.maxWidth}px`,
      marginBottom: theme.space(3),
      borderBottom: `1px solid ${theme.color.content.border}`,
      fontWeight: 300,

      '& th:first-child, & td:first-child': {
        paddingLeft: theme.space(2)
      },

      '& th:last-child, & td:last-child': {
        paddingRight: theme.space(2)
      },

      '& thead': {
        '& th': {
          padding: tableCellPadding,
          verticalAlign: 'top',
          background: theme.color.panel.light
        },

        '& th:last-child': {
          borderRight: `1px solid ${theme.color.content.border}`
        }
      },

      '& tbody': {
        '& td': {
          padding: tableCellPadding,
          verticalAlign: 'top',
          borderTop: `1px solid ${theme.color.content.border}`
        },

        '& tr:first-child td': {
          borderTop: 'none'
        },

        '& td:first-child': {
          borderLeft: `1px solid ${theme.color.content.border}`
        },

        '& td:last-child': {
          borderRight: `1px solid ${theme.color.content.border}`
        }
      }
    }
  },

  [theme.breakpoints.down('sm')]: {
    PageContent: {
      width: '100vw',
      marginLeft: 0,

      '& > *': {
        width: '100vw'
      }
    },

    Article: {
      paddingRight: theme.space(2),
      fontSize: '17px',

      '& ul ul': {
        marginLeft: '0em'
      }
    }
  }
});

export default styles;
