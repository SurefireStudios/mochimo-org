import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { tokens, fx, mono } from 'theme';

export function Reveal ({ children, delay = 0, sx }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(22px)',
        transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
          transform: 'none',
          transition: 'none'
        },
        ...sx
      }}
    >{children}
    </Box>
  );
}

export function Eyebrow ({ children, sx }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        mb: 2,
        ...sx
      }}
    >
      <Box sx={{ width: 22, height: '1px', background: tokens.brand }} />
      <Typography
        component='span'
        sx={{
          fontFamily: mono,
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: tokens.brand
        }}
      >{children}
      </Typography>
    </Box>
  );
}

export function SectionHeading ({ eyebrow, title, subtitle, align = 'left', maxWidth = 640 }) {
  const centered = align === 'center';
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 4, md: 6 },
        ...(centered && { mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' })
      }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Typography
        variant='h3'
        sx={{ fontSize: { xs: '1.9rem', sm: '2.3rem', md: '2.7rem' }, color: tokens.text }}
      >{title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            mt: 2,
            maxWidth,
            color: tokens.textDim,
            fontSize: { xs: '0.98rem', md: '1.05rem' },
            lineHeight: 1.7
          }}
        >{subtitle}
        </Typography>
      )}
    </Box>
  );
}

export function Section ({ children, id, sx, containerProps }) {
  return (
    <Box
      component='section' id={id}
      sx={{ position: 'relative', py: { xs: 7, md: 12 }, ...sx }}
    >
      <Container maxWidth='lg' {...containerProps}>{children}</Container>
    </Box>
  );
}

export function GlassPanel ({ children, hover = false, sx, ...props }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '16px',
        border: fx.hairline,
        backgroundImage: fx.glass.background,
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        ...(hover && fx.lift),
        ...sx
      }}
      {...props}
    >{children}
    </Box>
  );
}
