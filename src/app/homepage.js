import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetChainQuery, useGetContributorsQuery } from 'api';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Tooltip,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionIcon from '@mui/icons-material/Description';

import { Section, SectionHeading, Eyebrow, Reveal, GlassPanel } from './component/Section';
import { tokens, fx, mono, display } from 'theme';
import { BUY_MCM } from './component/Header';

const MAX_SUPPLY_FALLBACK = 76493180.0616804;

const focus = [
  {
    icon: '/assets/icons/quantum-computing.png',
    title: 'Quantum Resistance',
    body: 'Quantum Computing is poised to break Bitcoin and Ethereum without warning. Mochimo uses the WOTS+ algorithm for its wallets, securing them against any Quantum computing attack.'
  },
  {
    icon: '/assets/icons/decentralized.png',
    title: 'Decentralization & Fair Mining',
    body: 'Decentralization is everything. Mochimo is a Proof-of-Work (PoW) system like Bitcoin, but our coins are only mined by GPUs. There are no trusted nodes or central authority, not even the Core Team. Every node operator is equal on the network, including you!'
  },
  {
    icon: '/assets/icons/fast-charge.png',
    title: 'Fast!',
    body: 'Mochimo has one of the best block times for a PoW network. Our nodes start fast, converge fast, and process transactions quickly!'
  }
];

const innovations = [
  {
    id: 'crunch',
    icon: '/assets/icons/compress.png',
    title: 'ChainCrunch™ Compression',
    tag: 'Scalability',
    body: (
      <>
        With the size of many blockchains growing uncontrollably, and some
        already exceeding 1TB in size, scalability still remains a priority
        issue. Mochimo uses a proprietary compression algorithm called
        ChainCrunch™, which solves this issue without compromising on
        blockchain integrity.
        <br /><br />
        At almost 4 years of age and more than 670k blocks, the core component
        used to verify the integrity of the Blockchain is a mere 50MB in size.
        A full node need only download an additional and tiny, compressed
        portion of the historical blockchain and begin contributing to the
        network immediately.
      </>
    )
  },
  {
    id: 'pseudo',
    icon: '/assets/icons/pseudoblock.png',
    title: 'Pseudo-block Failsafe',
    tag: 'Resilience',
    body: (
      <>
        What happens when a large portion power suddenly disappears from the
        network? With the remaining power left to solve tremendously high
        difficulties in order to clear transactions, how long should you wait?
        Days? WEEKS? MoNtHs? Not around these parts...
        <br /><br />
        The Mochimo network detects long block times and agrees to lower the
        difficulty with a special kind of block. The "pseudo-block". With the
        power of friendship (and of course, a little "pseudo" blockchain
        magic), the Mochimo network restores normal clearing times to
        transactions within hours of a 90% mining power loss.
      </>
    )
  },
  {
    id: '3way',
    icon: '/assets/icons/handshake.png',
    title: 'Three-Way Handshake',
    tag: 'Protocol',
    body: (
      <>
        The Three-Way handshake is a network communication protocol requiring
        the collection of "acknowledgements" providing fast, simple and
        disposable security for secure requests to the decentralized network of
        nodes that make up the Mochimo Network.
      </>
    )
  },
  {
    id: 'tag',
    icon: '/assets/icons/tag.png',
    title: 'Quantum Resistant Addresses',
    tag: 'Cryptography',
    body: (
      <>
        Address size is one of the major hurdles with Quantum Resistant public
        keys. At 2208 bytes, it's more than a handful to remember or to share.
        Fortunately, Mochimo deploys a custom tagging feature that automatically
        generates an address from the very first quantum resistant public key
        ever used. This address will never change, even if the public keys
        change. This allows enormous public keys to be "tagged" with a short and
        easily memorable address of a mere 20 bytes in length. The official way
        of sharing these 20 bytes follows the Bitcoin standard of using base58,
        and including a crc16 checksum at the end.
      </>
    )
  },
  {
    id: 'peach',
    icon: '/assets/icons/gpu-mcm.png',
    title: 'FPGA-Tough POW',
    tag: 'Mining',
    body: (
      <>
        Dubbed "The Peach Algorithm", Mochimo uses a unique "FPGA-Tough" Proof
        of Work mining algorithm, that is specifically designed to shift the
        value of mining in favor of miners with Gaming GPUs.
        <br /><br />
        The Peach algorithm a standard arrangement of hashing algorithms, memory
        transformations, and deterministic FLOPs as the first layer of "FPGA
        Tough"-ness. This layer is further supported by a minimum VRAM
        requirement that gives a considerable "mining advantage" to hardware
        (notably GPUs) with the ability to cache a large sparse matrix of
        pre-computed data unique to each block.
        <br /><br />
        Ultimately, the few FPGAs with access to this "mining advantage" are
        likely to be eclipsed by Gaming GPUs in terms of value.
      </>
    )
  }
];

function HeroBackdrop () {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(120% 90% at 50% 25%, #000 30%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(120% 90% at 50% 25%, #000 30%, transparent 78%)'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '-40% -10% auto -10%',
          height: '150%',
          backgroundImage: `
            linear-gradient(${tokens.line} 1px, transparent 1px),
            linear-gradient(90deg, ${tokens.line} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          transform: 'perspective(760px) rotateX(62deg)',
          transformOrigin: 'top center',
          opacity: 0.7
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '-28%',
          left: '50%',
          width: 'min(1180px, 130vw)',
          height: 'min(1180px, 130vw)',
          transform: 'translateX(-50%)',
          background: `radial-gradient(circle, rgba(0,89,255,0.20) 0%, rgba(0,217,255,0.07) 38%, transparent 66%)`,
          filter: 'blur(18px)'
        }}
      />
    </Box>
  );
}

function Stat ({ label, value, accent }) {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: 2.25,
        flex: '1 1 150px',
        minWidth: 130,
        borderRight: { xs: 'none', sm: fx.hairline },
        '&:last-of-type': { borderRight: 'none' }
      }}
    >
      <Typography
        sx={{
          fontFamily: mono,
          fontSize: '0.62rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: tokens.textFaint,
          mb: 0.75
        }}
      >{label}
      </Typography>
      <Typography
        sx={{
          fontFamily: display,
          fontWeight: 600,
          fontSize: { xs: '1.15rem', md: '1.35rem' },
          letterSpacing: '-0.02em',
          color: accent ? tokens.accent : tokens.text,
          lineHeight: 1.15
        }}
      >{value}
      </Typography>
    </Box>
  );
}

function Hero ({ chain }) {
  const maxSupply = chain.data?.maxsupply || MAX_SUPPLY_FALLBACK;
  const height = chain.data?.bnum;

  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        pt: { xs: '132px', md: '190px' },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden'
      }}
    >
      <HeroBackdrop />
      <Container maxWidth='lg' sx={{ textAlign: 'center' }}>
        <Reveal>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2,
              py: 0.75,
              mb: { xs: 3, md: 4 },
              borderRadius: 999,
              border: fx.hairline,
              backgroundImage: fx.glass.background,
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box
              sx={{
                width: 6, height: 6, borderRadius: '50%',
                background: tokens.accent,
                boxShadow: `0 0 10px ${tokens.accent}`
              }}
            />
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: tokens.textDim
              }}
            >Est. 2018 &middot; Live Mainnet
            </Typography>
          </Box>
        </Reveal>

        <Reveal delay={60}>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '2.6rem', sm: '3.6rem', md: '4.9rem' },
              mb: 2.5
            }}
          >
            <Box component='span' sx={{ color: tokens.text }}>Mochimo</Box>
            <br />
            <Box component='span' sx={fx.textGradient}>Cryptocurrency Network</Box>
          </Typography>
        </Reveal>

        <Reveal delay={120}>
          <Typography
            sx={{
              maxWidth: 620,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.7,
              color: tokens.textDim
            }}
          >
            The world's first completely quantum resistant cryptocurrency.
          </Typography>
        </Reveal>

        <Reveal delay={180}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.75,
              justifyContent: 'center',
              mt: { xs: 4, md: 5 }
            }}
          >
            <Tooltip title={BUY_MCM.full}>
              <Button
                variant='contained' size='large'
                href={BUY_MCM.href} target='_blank' rel='noopener noreferrer'
                endIcon={<ArrowForwardIcon />}
              >{BUY_MCM.label}
              </Button>
            </Tooltip>
            <Button
              variant='outlined' size='large'
              href='/assets/files/mochimo_wp_EN.pdf'
              target='_blank' rel='noopener noreferrer'
              startIcon={<DescriptionIcon />}
            >Read the Whitepaper
            </Button>
          </Box>
        </Reveal>

        <Reveal delay={240}>
          <GlassPanel
            sx={{
              mt: { xs: 6, md: 8 },
              mx: 'auto',
              maxWidth: 860,
              display: 'flex',
              flexWrap: 'wrap',
              textAlign: 'left'
            }}
          >
            <Stat label='Launched' value='June 2018' />
            <Stat label='Consensus' value='Proof of Work' />
            <Stat label='Signatures' value='WOTS+' accent />
            <Stat
              label='Max Supply'
              value={`${Math.round(maxSupply).toLocaleString('en-US')} MCM`}
            />
            {height ? (
              <Stat label='Block Height' value={Number(height).toLocaleString('en-US')} accent />
            ) : null}
          </GlassPanel>
        </Reveal>
      </Container>
    </Box>
  );
}

function FocusCard ({ item, index }) {
  return (
    <Reveal delay={index * 90} sx={{ height: '100%' }}>
      <GlassPanel
        hover
        sx={{
          height: '100%',
          p: { xs: 3, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 24,
            right: 24,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${tokens.brand}, transparent)`,
            opacity: 0.55
          }
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '14px',
            mb: 2.5,
            display: 'grid',
            placeItems: 'center',
            border: fx.hairline,
            background: 'rgba(45,127,255,0.08)'
          }}
        >
          <Box
            component='img' alt='' src={item.icon}
            sx={{ width: 34, height: 34, objectFit: 'contain' }}
          />
        </Box>
        <Typography variant='h6' sx={{ fontSize: '1.2rem', mb: 1.25, color: tokens.text }}>
          {item.title}
        </Typography>
        <Typography sx={{ color: tokens.textDim, fontSize: '0.94rem', lineHeight: 1.72 }}>
          {item.body}
        </Typography>
      </GlassPanel>
    </Reveal>
  );
}

function HaikuPanel ({ chain }) {
  const lines = chain.data?.haiku?.split(' \n');
  return (
    <GlassPanel
      sx={{
        p: { xs: 3, md: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(160deg, rgba(45,127,255,0.10), rgba(255,255,255,0.015))'
      }}
    >
      <Box>
        <Box
          sx={{
            width: 52, height: 52, borderRadius: '13px', mb: 2.5,
            display: 'grid', placeItems: 'center',
            border: fx.hairline, background: 'rgba(0,217,255,0.08)'
          }}
        >
          <Box component='img' alt='' src='/assets/icons/poetry.png' sx={{ width: 28, height: 28 }} />
        </Box>
        <Typography variant='h6' sx={{ fontSize: '1.2rem', mb: 1.25 }}>
          Haiku of the Blockchain
        </Typography>
        <Typography sx={{ color: tokens.textDim, fontSize: '0.92rem', lineHeight: 1.7 }}>
          In the beginning, there was a single Haiku... and now there are
          hundreds of thousands of Haiku baked into each and every single
          block. Not only are they great to look at, it is a requirement of
          blockchain validity that the nonce used to solve a block originates
          from a syntactically correct Haiku.
          <br /><br />
          With nearly 5 Trillion possible combinations of possible Haiku,
          Mochimo is a gold mine of poetry.
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 3,
          pt: 3,
          borderTop: fx.hairline,
          textAlign: 'center'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Redressed, cursive',
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            lineHeight: 1.45,
            color: tokens.text
          }}
        >
          {lines
            ? lines.map((line, i) => (
              <Box component='span' key={`haiku-${i}`} sx={{ display: 'block' }}>{line}</Box>
              ))
            : (
              <>
                <Box component='span' sx={{ display: 'block' }}>above day</Box>
                <Box component='span' sx={{ display: 'block' }}>a journey</Box>
                <Box component='span' sx={{ display: 'block' }}>walking</Box>
              </>
              )}
        </Typography>
        <Typography
          sx={{
            mt: 1.5,
            fontFamily: mono,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tokens.textFaint
          }}
        >{lines ? 'Latest Block Haiku' : 'The Genesis Haiku'}
        </Typography>
      </Box>
    </GlassPanel>
  );
}

export default function Homepage () {
  const chain = useGetChainQuery();
  const contributors = useGetContributorsQuery({ owner: 'mochimodev', repo: 'mochimo' });
  const [active, setActive] = useState(false);
  const handleChange = (panel) => (_event, isActive) => setActive(isActive ? panel : false);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Hero chain={chain} />

      <Section id='focus'>
        <SectionHeading
          align='center'
          eyebrow="Mochimo's Focus"
          title='Built for the post-quantum era'
          subtitle='Three principles have guided the Mochimo Cryptocurrency Engine since the first block was solved in 2018.'
          maxWidth={620}
        />
        <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems='stretch'>
          {focus.map((item, i) => (
            <Grid item xs={12} md={4} key={item.title} sx={{ display: 'flex' }}>
              <FocusCard item={item} index={i} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section id='innovations'>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems='flex-start'>
          <Grid item xs={12} md={5}>
            <Reveal>
              <Eyebrow>Mochimo Innovations</Eyebrow>
              <Typography
                variant='h3'
                sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, mb: 2.5 }}
              >Innovations that<br />set Mochimo apart
              </Typography>
              <Typography sx={{ color: tokens.textDim, lineHeight: 1.75, mb: 2 }}>
                The extensive history of updates and improvements to the Mochimo
                Cryptocurrency Engine is always accesible from Mochimo's&nbsp;
                <Tooltip title='Extensive History'>
                  <Link href='https://github.com/mochimodev/mochimo' target='_blank' rel='noopener noreferrer'>
                    Github Repository
                  </Link>
                </Tooltip>.
              </Typography>
              <Typography sx={{ color: tokens.textDim, lineHeight: 1.75 }}>
                In addition, here are some of the novel innovations that set
                Mochimo apart...
              </Typography>
            </Reveal>
            <Reveal delay={120} sx={{ mt: 4, display: { xs: 'none', md: 'block' } }}>
              <HaikuPanel chain={chain} />
            </Reveal>
          </Grid>
          <Grid item xs={12} md={7}>
            <Reveal delay={80}>
              {innovations.map((item) => (
                <Accordion
                  key={item.id}
                  expanded={active === item.id}
                  onChange={handleChange(item.id)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Box
                        component='img' alt='' src={item.icon}
                        sx={{ width: 30, height: 30, objectFit: 'contain', flexShrink: 0 }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontFamily: display,
                            fontWeight: 600,
                            fontSize: '1.02rem',
                            color: tokens.text,
                            lineHeight: 1.3
                          }}
                        >{item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: mono,
                            fontSize: '0.6rem',
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: tokens.textFaint
                          }}
                        >{item.tag}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>{item.body}</AccordionDetails>
                </Accordion>
              ))}
            </Reveal>
            <Reveal delay={120} sx={{ mt: 3, display: { xs: 'block', md: 'none' } }}>
              <HaikuPanel chain={chain} />
            </Reveal>
          </Grid>
        </Grid>
      </Section>

      <Section id='team'>
        <SectionHeading
          align='center'
          eyebrow='The Team'
          title='Open source, built in the open'
          maxWidth={620}
        />
        <Reveal>
          <GlassPanel sx={{ p: { xs: 3, md: 4 }, mb: 3, textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.64rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: tokens.textFaint,
                mb: 2.5
              }}
            >Github Contributors
            </Typography>
            <AvatarGroup
              max={contributors.data?.length || 12}
              sx={{ justifyContent: 'center', '& .MuiAvatar-root': { width: 46, height: 46 } }}
            >
              {contributors.data?.map((contrib) => (
                <Tooltip key={contrib.login} title={contrib.login} placement='bottom'>
                  <Avatar
                    component='a'
                    alt={contrib.login}
                    src={contrib.avatar_url}
                    href={contrib.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{ transition: 'transform 200ms ease', '&:hover': { transform: 'translateY(-4px)' } }}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          </GlassPanel>
        </Reveal>
        <Grid container spacing={3} alignItems='stretch'>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Reveal delay={80} sx={{ width: '100%' }}>
              <GlassPanel hover sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                <Typography variant='h5' sx={{ fontSize: '1.4rem', mb: 1.75 }}>
                  Core Contributors
                </Typography>
                <Typography sx={{ color: tokens.textDim, lineHeight: 1.75, mb: 2.5 }}>
                  Mochimo's core contributors is comprised of industry leaders in
                  the fields of computer networking, artificial intelligence,
                  telecommunications, cryptography and software engineering.
                  Though the majority of it's members wish to remain anonymous,
                  you can see some of the core contributors.
                </Typography>
                <Tooltip title="They're friendly">
                  <Button
                    variant='outlined' to='/meet-the-team'
                    component={RouterLink} endIcon={<ArrowForwardIcon />}
                  >Meet The Team
                  </Button>
                </Tooltip>
              </GlassPanel>
            </Reveal>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Reveal delay={160} sx={{ width: '100%' }}>
              <GlassPanel hover sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                <Typography variant='h5' sx={{ fontSize: '1.4rem', mb: 1.75 }}>
                  Interested in Contributing?
                </Typography>
                <Typography sx={{ color: tokens.textDim, lineHeight: 1.75 }}>
                  Core Contributors are selected based on recommendation, or via
                  recognition of invaluable contributions to the project. If you
                  wish to contribute to Mochimo, Pull Requests are always open.
                  If you wish to discuss something specific, please reach out to
                  the active community on&nbsp;
                  <Link href='https://discord.mochimo.org/' target='_blank' rel='noopener noreferrer'>
                    Discord
                  </Link>, or&nbsp;
                  <Link href='mailto:support@mochimo.org'>contact support</Link>
                  &nbsp;with your inquiries.
                </Typography>
              </GlassPanel>
            </Reveal>
          </Grid>
        </Grid>
      </Section>

      <Section id='faq' sx={{ pb: { xs: 2, md: 4 } }}>
        <Reveal>
          <GlassPanel
            sx={{
              p: { xs: 4, md: 7 },
              textAlign: 'center',
              background: 'linear-gradient(150deg, rgba(0,89,255,0.16), rgba(0,217,255,0.05) 55%, rgba(255,255,255,0.015))'
            }}
          >
            <Typography
              variant='h3'
              sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}
            >Frequently Asked Questions
            </Typography>
            <Typography
              sx={{ color: tokens.textDim, fontSize: '1.02rem', mb: 4 }}
            >Have questions about Mochimo? We have answers!
            </Typography>
            <Button
              variant='contained' size='large'
              component={RouterLink} to='/faq'
              endIcon={<ArrowForwardIcon />}
            >View All FAQs
            </Button>
          </GlassPanel>
        </Reveal>
      </Section>
    </Box>
  );
}
