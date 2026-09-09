import { Box, Container, Divider, Grid, IconButton, Link, Tooltip, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

import { scrollToTopNow } from './ScrollToTop';
import { social } from 'links';
import { tokens, fx, mono, display } from 'theme';

const columns = [
  {
    heading: 'About',
    links: [
      { label: 'Mochimo', to: '/' },
      { label: 'Adequate', to: '/adq' },
      { label: 'Meet The Team', to: '/meet-the-team' },
      { label: 'Privacy', to: '/privacy-policy' }
    ]
  },
  {
    heading: 'Network',
    links: [
      { label: 'Explorer', href: 'https://mochiscan.org' },
      { label: 'Live Status', href: 'https://status.mochimo.org' },
      { label: 'Mining', to: '/mining' },
      { label: 'Vote: PoW or PoS', to: '/vote' }
    ]
  },
  {
    heading: 'Links',
    links: [
      { label: 'Github', href: 'https://github.com/mochimodev/mochimo/releases' },
      { label: 'Whitepaper', href: '/assets/files/mochimo_wp_EN.pdf' },
      { label: 'Exchanges', to: '/exchanges-mcm' },
      { label: 'Merchandise', href: 'https://my-store-b9cfd9.creator-spring.com' },
      { label: 'CoinMarketCap', href: 'https://coinmarketcap.com/currencies/mochimo/' }
    ]
  }
];

function FooterLink ({ label, to, href }) {
  const props = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { to, onClick: scrollToTopNow };
  return (
    <Link
      underline='none' {...props}
      sx={{
        display: 'block',
        fontSize: '0.875rem',
        color: tokens.textDim,
        py: 0.6,
        transition: 'color 160ms ease, transform 160ms ease',
        '&:hover': { color: tokens.text, transform: 'translateX(3px)' }
      }}
    >{label}
    </Link>
  );
}

export default function Footer () {
  return (
    <Box
      component='footer'
      sx={{
        position: 'relative',
        zIndex: 2,
        mt: 10,
        borderTop: fx.hairline,
        background: 'linear-gradient(180deg, rgba(10,14,21,0.4) 0%, rgba(5,7,11,0.92) 100%)',
        backdropFilter: 'blur(14px)',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: '18%',
          right: '18%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${tokens.brand}, transparent)`
        }
      }}
    >
      <Container maxWidth='lg' sx={{ pt: { xs: 6, md: 8 }, pb: 4 }}>
        <Grid container spacing={{ xs: 5, md: 4 }}>
          <Grid item xs={12} md={4.5}>
            <Box
              component='img' alt='Mochimo logo and slogan'
              src='/assets/images/logo-full.png'
              sx={{ width: 250, maxWidth: '70%', display: 'block', mb: 2.5 }}
            />
            <Typography
              sx={{ color: tokens.textDim, fontSize: '0.9rem', maxWidth: 380, mb: 3 }}
            >
              The world's first completely quantum resistant cryptocurrency.
              Open source, fully decentralized, and mined by GPUs since 2018.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3, ml: -1 }}>
              {social.map(({ href, Icon, primary }) => (
                <Tooltip key={primary} title={primary}>
                  <IconButton
                    component='a' href={href} target='_blank' rel='noopener noreferrer'
                    size='small' sx={{ color: tokens.textDim }}
                  ><Icon fontSize='small' />
                  </IconButton>
                </Tooltip>
              ))}
              <Tooltip title='Email'>
                <IconButton
                  component='a' href='mailto:support@mochimo.org'
                  size='small' sx={{ color: tokens.textDim }}
                ><EmailIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </Box>
            <Link
              to='/adq' onClick={scrollToTopNow}
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, opacity: 0.65, '&:hover': { opacity: 1 } }}
            >
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.62rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: tokens.textFaint
                }}
              >Built by
              </Typography>
              <Box
                component='img' alt='Adequate Systems'
                src='/assets/source/adq-logo.svg'
                sx={{ width: 110 }}
              />
            </Link>
          </Grid>

          {columns.map(({ heading, links }) => (
            <Grid item xs={6} sm={4} md={2.5} key={heading}>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.66rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: tokens.brand,
                  mb: 1.75
                }}
              >{heading}
              </Typography>
              {links.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mt: { xs: 5, md: 7 }, mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontSize: '0.78rem', color: tokens.textFaint }}>
            Copyright 2025 &copy; All rights Reserved. The Mochimo Foundation.
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: tokens.textFaint }}>
            Some icons by&nbsp;
            <Link href='https://www.flaticon.com/authors/icongeek26' color='inherit' underline='hover'>icongeek26</Link>,&nbsp;
            <Link href='https://www.flaticon.com/authors/phatplus' color='inherit' underline='hover'>phatplus</Link>,&nbsp;
            <Link href='https://www.flaticon.com/authors/freepik' color='inherit' underline='hover'>Freepik</Link> -&nbsp;
            <Link href='https://www.flaticon.com/' color='inherit' underline='hover'>Flaticon</Link>
          </Typography>
        </Box>
      </Container>
      <Box
        aria-hidden
        sx={{
          fontFamily: display,
          fontWeight: 700,
          textAlign: 'center',
          fontSize: 'clamp(3rem, 15vw, 13rem)',
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          background: `linear-gradient(180deg, ${tokens.line} 0%, transparent 82%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
          pb: 1,
          px: 2
        }}
      >MOCHIMO
      </Box>
    </Box>
  );
}
