import { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { scrollToTopNow } from '../component/ScrollToTop';
import { Reveal, GlassPanel } from '../component/Section';
import { tokens, fx, mono } from 'theme';

const VOTE_ADDRESS = 'c2QVMZKC1KyQq84VVQc32sniKQhB6e';

function Block ({ title, children }) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        variant='h5'
        sx={{ fontSize: { xs: '1.25rem', md: '1.45rem' }, mb: 1.75, color: tokens.text }}
      >{title}
      </Typography>
      {children}
    </Box>
  );
}

function Body ({ children, sx }) {
  return (
    <Typography
      sx={{ color: tokens.textDim, lineHeight: 1.78, mb: 2, fontSize: '1rem', ...sx }}
    >{children}
    </Typography>
  );
}

function Bullets ({ items }) {
  return (
    <Box component='ul' sx={{ pl: 0, m: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <Box
          component='li' key={i}
          sx={{
            position: 'relative',
            pl: 3.25,
            mb: 1.75,
            color: tokens.textDim,
            lineHeight: 1.75,
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 4,
              top: '0.62em',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: tokens.brand
            }
          }}
        >{item}
        </Box>
      ))}
    </Box>
  );
}

function Callout ({ children, label }) {
  return (
    <Box
      sx={{
        my: 3,
        p: 2.5,
        borderRadius: '14px',
        border: `1px solid rgba(45,127,255,0.42)`,
        background: 'rgba(45,127,255,0.08)',
        textAlign: 'center'
      }}
    >
      {label && (
        <Typography
          sx={{
            fontFamily: mono,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tokens.textFaint,
            mb: 1
          }}
        >{label}
        </Typography>
      )}
      <Typography
        sx={{
          fontFamily: mono,
          fontSize: { xs: '0.85rem', md: '1rem' },
          color: tokens.text,
          wordBreak: 'break-all',
          lineHeight: 1.6
        }}
      >{children}
      </Typography>
    </Box>
  );
}

export default function Vote () {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth='md' sx={{ pb: { xs: 4, md: 8 } }}>
      <Reveal>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2.25,
              py: 0.9,
              mb: 3,
              borderRadius: 999,
              border: `1px solid rgba(0,217,255,0.45)`,
              background: 'rgba(0,217,255,0.10)'
            }}
          >
            <Box
              sx={{
                width: 7, height: 7, borderRadius: '50%',
                background: tokens.accent,
                boxShadow: `0 0 10px ${tokens.accent}`,
                animation: 'votePulse 2s ease-in-out infinite',
                '@keyframes votePulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.25 }
                }
              }}
            />
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.76rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: tokens.text
              }}
            >VOTING IS NOW OPEN
            </Typography>
          </Box>
          <Typography
            variant='h1'
            sx={{ fontSize: { xs: '2.2rem', sm: '2.9rem', md: '3.5rem' }, mb: 2 }}
          >
            <Box component='span' sx={fx.textGradient}>PoW-PoS On-Chain Voting</Box>
          </Typography>
        </Box>
      </Reveal>

      <Reveal delay={80}>
        <GlassPanel sx={{ p: { xs: 3, md: 5 } }}>
          <Body>
            After a lot of community discussion over the years, the Core
            Contributor Team is asking for your help in choosing the future of
            the Mochimo network's consensus algorithm.
          </Body>
          <Body>
            To ensure all community members have a fair opportunity to
            participate, the PoW-PoS on-chain voting window has been extended by
            one week.
          </Body>
          <Body sx={{ mb: 0 }}>
            To prevent last-minute attempts to force an outcome without
            sufficient response time, voting close will now be determined by an
            objective on-chain event instead of a fixed second on the clock.
          </Body>

          <Block title='Voting Window Extension'>
            <Body sx={{ mb: 0 }}>
              Voting remains open through May 7, 2026, and transitions into a
              randomized close condition after 00:00:00 UTC on May 7, 2026.
            </Body>
          </Block>

          <Block title='How Voting Will Close'>
            <Bullets
              items={[
                <>
                  The final valid voting block is the{' '}
                  <Box component='strong' sx={{ color: tokens.text }}>
                    first block after May 7, 2026 00:00:00 UTC
                  </Box>{' '}
                  whose block hash begins with binary{' '}
                  <Box component='strong' sx={{ color: tokens.text }}>00000000</Box>{' '}
                  (shown in explorers as hash prefix{' '}
                  <Box component='strong' sx={{ color: tokens.text }}>0x00</Box>).
                </>,
                <>
                  Because block hashes are unknown until a block is solved, each
                  block after that time has roughly a{' '}
                  <Box component='strong' sx={{ color: tokens.text }}>1/256</Box>{' '}
                  chance of being the terminal voting block.
                </>,
                <>
                  This means the close could occur immediately, or only after
                  additional blocks have been mined, creating a buffer for
                  community response instead of a single predictable cutoff
                  moment.
                </>
              ]}
            />
          </Block>

          <Block title='The Question'>
            <Body sx={{ mb: 0 }}>
              Do you want the Mochimo network to remain{' '}
              <Box component='strong' sx={{ color: tokens.text }}>PoW</Box>{' '}
              (Proof of Work, mined by GPU miners) or do you want Mochimo to
              migrate to a{' '}
              <Box component='strong' sx={{ color: tokens.text }}>PoS</Box>{' '}
              (Proof of Stake, where validator nodes confirm transactions and
              individual holders can stake their coins for staking rewards)?
            </Body>
          </Block>

          <Block title='How to Vote'>
            <Body>
              In order to answer this question, each person who desires to vote
              must send a single transaction to the official MCM voting address:
            </Body>
            <Callout label='Official MCM Voting Address'>{VOTE_ADDRESS}</Callout>
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Button
                variant='contained'
                href='https://mochiscan.org/address/0x810b82c44efb657ad4cc7937578668b19e985e72'
                target='_blank' rel='noopener noreferrer'
                startIcon={<HowToVoteIcon />}
                endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
              >Click Here to See Recent Votes
              </Button>
            </Box>
            <Callout label='Voting Close Trigger'>
              first post-2026-05-07 00:00:00 UTC block with hash prefix 0x00
            </Callout>
            <Body>
              Send the smallest amount the network will accept which is{' '}
              <Box component='strong' sx={{ color: tokens.text }}>0.000000501 MCM</Box>,
              and add a memo field with either the word{' '}
              <Box
                component='strong'
                sx={{ fontFamily: mono, color: tokens.accent }}
              >POW
              </Box>{' '}or{' '}
              <Box
                component='strong'
                sx={{ fontFamily: mono, color: tokens.accent }}
              >POS
              </Box>{' '}in it.
            </Body>
            <Body sx={{ mb: 0 }}>
              The memo represents the network type you want to have in the
              future. If you want to migrate to PoS for example, enter{' '}
              <Box component='strong' sx={{ fontFamily: mono, color: tokens.accent }}>POS</Box>{' '}
              in the memo field.
            </Body>
          </Block>

          <Block title='Voting Rules'>
            <Bullets
              items={[
                'Only the first vote transaction received from each address with a proper memo string included (either "POW" or "POS") will count.',
                "Please don't vote multiple times.",
                'To prevent any coin shuffling double-voting shenanigans, on May 1st we will check each address with either a POW or POS vote transaction.',
                'Whatever that address balance shows on May 1st is how many votes will be credited to either PoS or PoW.'
              ]}
            />
          </Block>

          <Block title='Results'>
            <Body sx={{ mb: 0 }}>
              Vote results will be tabulated and presented on this page late on
              May 1st.
            </Body>
          </Block>
        </GlassPanel>
      </Reveal>
    </Container>
  );
}
