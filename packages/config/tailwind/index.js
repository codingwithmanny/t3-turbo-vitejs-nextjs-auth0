// Imports
// ========================================================
const plugin = require('tailwindcss/plugin');
// const defaultTheme = require('tailwindcss/defaultTheme');

// Constants
// ========================================================
const config = {
  marginBottom: 'mb-8'
};

// Exports
// ========================================================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      colors: {
        // primary: {
        //   50: '#FAF8FF',
        //   100: '#EEE7FF',
        //   200: '#DECEFF',
        //   300: '#C4A9FF',
        //   400: '#A378FF',
        //   500: '#8754F5',
        //   600: '#672EE3',
        //   700: '#4E1CBA',
        //   800: '#441C9A',
        //   900: '#3A1A80',
        //   950: '#19083E',
        // }
      }
    },
    // fontFamily: {
    //   sans: [
    //     `Inter, ${defaultTheme.fontFamily.sans.join(',')}`,
    //   ],
    // },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addBase, addUtilities, addComponents, theme, e, config }) => {
      /**
       * Base
       */
      addBase({
        /* 
        // Base
        // ========================================================
        */
        'html,body': {
          backgroundColor: theme('colors.zinc.900'),
          color: theme('colors.zinc.400'),
        },
        /* 
        // Text
        // ========================================================
        */
        'h1,h2,h3,h4,h5,h6,p,ul,ol,dl,hr,pre,form,table': {
          marginBottom: theme('margin.8'),
        },
        'h1,h2,h3,h4,h5,h6': {
          color: theme('colors.zinc.200'),
          fontWeight: theme('fontWeight.medium'),
        },
        'h1': {
          fontSize: theme('fontSize.4xl'),
          color: theme('colors.zinc.50'),
        },
        'h2': {
          fontSize: theme('fontSize.2xl'),
          color: theme('colors.zinc.200'),
        },
        'h3': {
          fontSize: theme('fontSize.xl'),
        },
        'h4': {
          fontSize: theme('fontSize.lg'),
        },
        'h5': {
          fontSize: theme('fontSize.lg'),
        },
        'h6': {
          fontSize: theme('fontSize.lg'),
          color: theme('colors.zinc.400'),
          fontWeight: theme('fontWeight.normal'),
        },
        'p': {

        },
        'hr': {
          borderColor: theme('colors.zinc.800'),
        },
        'pre': {
          backgroundColor: theme('colors.zinc.800'),
          padding: theme('padding.4'),
          display: 'block',
          overflowX: 'scroll',
        },
        /* 
        // Inline
        // ========================================================
        */
        'a': {
          textDecoration: 'underline',
          color: theme('colors.zinc.100'),
          '&:hover': {
            color: theme('colors.zinc.300'),
          }
        },
        'b,strong': {
          fontWeight: theme('fontWeight.medium'),
          color: theme('colors.zinc.300'),
        },
        'em, i': {
        },
        'code': {
          color: theme('colors.zinc.300'),
        },
        's': {
        },
        'u': {
        },
        'small': {
        },
        /* 
        // Lists
        // ========================================================
        */
        'ul,ol,dl': {
        },
        'ul': {
        },
        'ol': {
        },
        'dl': {
        },
        'li': {
        },
        'dt': {
        },
        'dd': {
        },
        /* 
        // Forms
        // ========================================================
        */
        'form': {
        },
        'label': {
          display: 'block',
          color: theme('colors.zinc.500'),
          marginBottom: theme('margin.2'),
        },
        'input[type="text"],input[type="email"],input[type="password"],input[type="number"],input[type="date"],input[type="datetime-local"],input[type="month"],input[type="search"],input[type="tel"],input[type="time"],input[type="url"],input[type="week"],select,textarea': {
          lineHeight: theme('lineHeight.10'),
          paddingLeft: theme('padding.3'),
          paddingRight: theme('padding.3'),
          paddingTop: '0rem',
          paddingBottom: '0rem',
          borderRadius: theme('borderRadius.DEFAULT'),
          color: theme('colors.zinc.600'),
          '&:disabled': {
            opacity: theme('opacity.30'),
          },
        },
        'input[type="checkbox"],input[type="radio"]': {
          marginRight: theme('margin.2'),
          '&:disabled': {
            opacity: theme('opacity.30'),
          },
        },
        'progress': {
        },
        /* 
        // Buttons
        // ========================================================
        */
        'button,button[type="submit"],button[type="button"],a[type="button"],input[type="button"],input[type="reset"]': {
          lineHeight: '2.75rem',
          paddingLeft: theme('padding.4'),
          paddingRight: theme('padding.4'),
          borderRadius: theme('borderRadius.DEFAULT'),
          backgroundColor: theme('colors.zinc.700'),
          color: theme('colors.zinc.100'),
          fontWeight: theme('fontWeight.medium'),
          textDecoration: 'none',
          '&:hover': {
            backgroundColor: theme('colors.zinc.600'),
          },
          '&:disabled': {
            opacity: theme('opacity.30'),
          },
          '&:disabled:hover': {
            backgroundColor: theme('colors.zinc.700'),
          },
        },
        /* 
        // Media
        // ========================================================
        */
        'img': {
        },
        'video': {
        },
        'iframe': {
        },
        'audio': {
        },
        /* 
        // Tables
        // ========================================================
        */
        'table': {
          borderCollapse: 'separate',
          borderSpacing: theme('borderSpacing.0'),
          width: '100%',
          textAlign: 'left',
          'tr': {
            'td,th': {
              padding: theme('padding.4'),
              borderBottomWidth: theme('borderWidth.DEFAULT'),
              borderRightWidth: theme('borderWidth.DEFAULT'),
              borderColor: theme('colors.zinc.600'),
              '&:first-child': {
                borderLeftWidth: theme('borderWidth.DEFAULT'),
              },
            },
          },
          'thead': {
            'tr': {
              'th': {
                backgroundColor: theme('colors.zinc.800'),
                color: theme('colors.zinc.200'),
                fontWeight: theme('fontWeight.medium'),
              },
              '&:first-child': {
                'th': {
                  borderTopWidth: theme('borderWidth.DEFAULT'),
                  '&:first-child': {
                    borderTopLeftRadius: theme('borderRadius.md'),
                  },
                  '&:last-child': {
                    borderTopRightRadius: theme('borderRadius.md'),
                  }
                },
              }
            }
          },
          'tbody': {
            display: 'none',
            'tr': {
              'td': {
              },
              '&:nth-child(even)': {
                'td': {
                  backgroundColor: theme('colors.zinc.800/30'),
                },
              },
              '&:last-child': {
                'td': {
                  '&:first-child': {
                    borderBottomLeftRadius: theme('borderRadius.md'),
                  },
                  '&:last-child': {
                    borderBottomRightRadius: theme('borderRadius.md'),
                  }
                }
              },
            },
            '&:not(empty)': {
              display: 'table-row-group',
            },
          },
          'tfoot': {
            display: 'none',
            'tr': {
              'td': {
                '&:first-child': {
                  borderBottomLeftRadius: theme('borderRadius.md'),
                  borderLeftWidth: theme('borderWidth.DEFAULT'),
                },
                '&:last-child': {
                  borderBottomRightRadius: theme('borderRadius.md'),
                },
              },
            },
          },
          'tbody:empty + tfoot': {
            display: 'table-footer-group',
          }
        },
      });

      /**
       *
       */
      addComponents({
        '.card': {
          backgroundColor: theme('colors.zinc.900'),
          borderWidth: theme('borderWidth.DEFAULT'),
          borderColor: theme('colors.zinc.700'),
          borderRadius: theme('borderRadius.lg'),
          position: 'relative',
          '.card-image': {
            'img': {
              marginTop: '-1px',
              marginLeft: '-1px',
              marginRight: '-1px',
              width: 'calc(100% + 2px)',
              maxWidth: 'none',
              height: 'auto',
              borderTopLeftRadius: theme('borderRadius.lg'),
              borderTopRightRadius: theme('borderRadius.lg'),
            }
          },
          '.card-header,.card-body': {
            borderBottomWidth: theme('borderWidth.DEFAULT'),
            borderColor: theme('colors.zinc.700'),
          },
          '.card-header,.card-body,.card-footer': {
            padding: theme('padding.6'),
          },
        },
      })
    }),
  ],
};
