import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const tokens = {
  base: '#05070B',
  raise: '#0A0E15',
  surface: '#0E131C',
  brand: '#2D7FFF',
  brandDeep: '#0059FF',
  brandDim: '#0A2A6B',
  accent: '#00D9FF',
  text: '#E9EEF6',
  textDim: 'rgba(233, 238, 246, 0.62)',
  textFaint: 'rgba(233, 238, 246, 0.40)',
  line: 'rgba(255, 255, 255, 0.08)',
  lineStrong: 'rgba(255, 255, 255, 0.16)',
  glow: 'rgba(45, 127, 255, 0.35)'
};

export const display = '"Space Grotesk", "Nunito Sans", system-ui, sans-serif';
export const body = '"Inter", system-ui, -apple-system, sans-serif';
export const mono = '"JetBrains Mono", "Roboto Mono", ui-monospace, monospace';

export const fx = {
  glass: {
    background: 'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)',
    border: `1px solid ${tokens.line}`,
    backdropFilter: 'blur(12px)'
  },
  hairline: `1px solid ${tokens.line}`,
  brandGradient: `linear-gradient(135deg, ${tokens.brandDeep} 0%, ${tokens.brand} 50%, ${tokens.accent} 100%)`,
  textGradient: {
    background: `linear-gradient(135deg, ${tokens.text} 20%, ${tokens.accent} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  lift: {
    transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease, box-shadow 220ms ease',
    '&:hover': {
      transform: 'translateY(-3px)',
      borderColor: tokens.lineStrong,
      boxShadow: `0 18px 40px -20px rgba(0,0,0,0.9), 0 0 0 1px ${tokens.line}`
    }
  }
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: tokens.brand, dark: tokens.brandDeep, light: '#6BA5FF' },
    secondary: { main: tokens.accent },
    background: { default: tokens.base, paper: tokens.raise },
    text: { primary: tokens.text, secondary: tokens.textDim },
    textPrimary: { main: tokens.text },
    divider: tokens.line
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: body,
    h1: {
      fontFamily: display,
      fontWeight: 700,
      letterSpacing: '-0.035em',
      lineHeight: 1.02,
      textAlign: 'center'
    },
    h2: {
      fontFamily: display,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.08
    },
    h3: {
      fontFamily: display,
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.14
    },
    h4: {
      fontFamily: display,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    },
    h5: {
      fontFamily: display,
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.28
    },
    h6: {
      fontFamily: display,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.35
    },
    body1: { fontSize: '1rem', lineHeight: 1.68, letterSpacing: '0.002em' },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    caption: {
      fontFamily: body,
      fontSize: '0.8125rem',
      lineHeight: 1.6,
      letterSpacing: '0.005em'
    },
    overline: {
      fontFamily: mono,
      fontSize: '0.6875rem',
      fontWeight: 500,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      lineHeight: 1.6
    },
    mono: { fontFamily: mono },
    haiku: {
      fontFamily: 'Redressed, cursive',
      fontSize: '2em',
      fontWeight: 'bold',
      letterSpacing: 1.5,
      whiteSpace: 'pre'
    },
    button: { fontFamily: display, fontWeight: 600, letterSpacing: '0.01em' }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: {
          backgroundColor: tokens.base,
          backgroundImage: [
            `radial-gradient(1100px 620px at 12% -8%, rgba(0,89,255,0.20), transparent 62%)`,
            `radial-gradient(900px 520px at 88% 4%, rgba(0,217,255,0.10), transparent 60%)`,
            `radial-gradient(1200px 800px at 50% 108%, rgba(0,89,255,0.10), transparent 66%)`
          ].join(','),
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        },
        '::selection': { background: 'rgba(45,127,255,0.32)' },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-track': { background: tokens.base },
        '*::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.14)',
          borderRadius: 8,
          border: `2px solid ${tokens.base}`
        },
        '*::-webkit-scrollbar-thumb:hover': { background: 'rgba(255,255,255,0.24)' }
      }
    },
    MuiContainer: {
      defaultProps: { sx: { position: 'relative' } }
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        rounded: { borderRadius: 16 }
      }
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: 'transparent',
          backgroundImage: fx.glass.background,
          border: fx.hairline,
          backdropFilter: 'blur(12px)'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: 24, '&:last-child': { paddingBottom: 24 } }
      }
    },
    MuiButton: {
      defaultProps: { color: 'primary', disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontSize: '0.9375rem',
          padding: '10px 22px',
          transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1), box-shadow 200ms ease, background 200ms ease'
        },
        sizeLarge: { padding: '14px 30px', fontSize: '1rem' },
        contained: {
          background: fx.brandGradient,
          color: '#03060D',
          fontWeight: 700,
          boxShadow: `0 10px 30px -12px ${tokens.glow}`,
          '&:hover': {
            boxShadow: `0 16px 40px -12px ${tokens.glow}`,
            transform: 'translateY(-2px)'
          }
        },
        outlined: {
          borderColor: tokens.lineStrong,
          color: tokens.text,
          '&:hover': {
            borderColor: tokens.brand,
            background: 'rgba(45,127,255,0.08)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0, square: false },
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: fx.hairline,
          backgroundColor: 'transparent',
          backgroundImage: fx.glass.background,
          backdropFilter: 'blur(12px)',
          marginBottom: 10,
          overflow: 'hidden',
          transition: 'border-color 220ms ease, background 220ms ease',
          '&:before': { display: 'none' },
          '&:hover': { borderColor: tokens.lineStrong },
          '&.Mui-expanded': {
            borderColor: 'rgba(45,127,255,0.42)',
            background: 'rgba(45,127,255,0.05)'
          }
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { padding: '4px 20px', minHeight: 68 },
        content: { margin: 0 },
        expandIconWrapper: { color: tokens.textDim }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '4px 24px 24px',
          color: tokens.textDim,
          lineHeight: 1.7,
          borderTop: fx.hairline,
          paddingTop: 20
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          backgroundColor: 'transparent'
        }
      }
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color: tokens.brand,
          textDecorationColor: 'rgba(45,127,255,0.4)',
          transition: 'color 160ms ease',
          '&:hover': { color: tokens.accent }
        }
      }
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: tokens.line } }
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontFamily: mono, fontSize: '0.75rem' },
        outlined: { borderColor: tokens.lineStrong }
      }
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: {
          background: tokens.surface,
          border: fx.hairline,
          fontFamily: body,
          fontSize: '0.75rem',
          padding: '8px 12px',
          borderRadius: 8
        },
        arrow: { color: tokens.surface }
      }
    },
    MuiAvatar: {
      styleOverrides: { root: { border: fx.hairline } }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'color 180ms ease, background 180ms ease, transform 180ms ease',
          '&:hover': { color: tokens.accent, transform: 'translateY(-2px)' }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: tokens.line },
        head: {
          fontFamily: mono,
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: tokens.textFaint
        }
      }
    }
  }
});

export default responsiveFontSizes(theme);
