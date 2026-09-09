import { useEffect } from 'react';
import { Box, Button, Chip, Grid, Link, Stack, Tooltip, Typography } from '@mui/material';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AppleIcon from '@mui/icons-material/Apple';
import LinuxIcon from '@mui/icons-material/Android';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import DiscordIcon from '../icons/DiscordIcon';
import { scrollToTopNow } from '../component/ScrollToTop';
import { Section, SectionHeading, Eyebrow, Reveal, GlassPanel } from '../component/Section';
import { tokens, fx, mono, display } from 'theme';

const osIcons = {
  Windows: <DesktopWindowsIcon fontSize='small' />,
  Linux: <LinuxIcon fontSize='small' />,
  MacOS: <AppleIcon fontSize='small' />
};

const soloMiners = [
  {
    platform: 'Windows',
    icon: <DesktopWindowsIcon />,
    description: 'Official Windows miner for Mochimo',
    link: 'https://github.com/mochimodev/mochimo/releases/tag/v3.0.3',
    instructions: 'Download the latest Windows release, extract it, and run mochimo.exe'
  },
  {
    platform: 'Linux',
    icon: <LinuxIcon />,
    description: 'Build from source for maximum performance on Linux',
    link: 'https://github.com/mochimodev/mochimo/releases/tag/v3.0.3',
    instructions: 'Extract mcmminer-v3.0.3.ubuntu.cuda-12.8-570.86.10.tar.gz and run it.'
  }
];

const miningPools = [
  {
    name: 'MochiPool',
    url: 'https://mochimodash.ddns.net/d/beeckp9iv0b9cd/mochipool',
    fee: '10%',
    description: 'A French-community driven mining pool with a focus on constant payouts and individual rig statistics tool.',
    discord: 'https://discord.gg/hcjZUVCnh7',
    icon: '/assets/images/mochipool-logo.png',
    supportedOS: ['Windows', 'Linux'],
    details: [
      { icon: <LocationOnIcon fontSize='small' />, label: 'Location', value: 'Switzerland (for improved data privacy)' },
      { icon: <PaymentIcon fontSize='small' />, label: 'Payouts', value: 'Twice per week (Sunday and Wednesday)' }
    ],
    howToJoin: {
      discordLink: 'https://discord.com/channels/1345166405263163464/1345167185567420448/1345174621648977991',
      description: 'Join the Discord server and follow the setup instructions in the #how-to-join channel.'
    }
  }
];

function DetailRow ({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
      <Box sx={{ color: tokens.brand, mt: '2px' }}>{icon}</Box>
      <Box>
        <Typography
          sx={{
            fontFamily: mono,
            fontSize: '0.6rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: tokens.textFaint
          }}
        >{label}
        </Typography>
        <Typography sx={{ color: tokens.text, fontSize: '0.9rem' }}>{value}</Typography>
      </Box>
    </Box>
  );
}

export default function Mining () {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Section sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 4, md: 6 } }}>
        <Reveal>
          <Box sx={{ textAlign: 'center' }}>
            <Eyebrow>Proof of Work</Eyebrow>
            <Typography
              variant='h1'
              sx={{ fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' }, mb: 2.5 }}
            >
              <Box component='span' sx={fx.textGradient}>Mining Mochimo</Box>
            </Typography>
            <Typography
              sx={{
                maxWidth: 700,
                mx: 'auto',
                color: tokens.textDim,
                fontSize: { xs: '1rem', md: '1.08rem' },
                lineHeight: 1.7
              }}
            >
              Mochimo uses a unique mining algorithm called Mochimo-Peach algorithm
              that is FPGA-resistant and can be efficiently mined on accessible
              consumer GPUs. You can mine Mochimo either by solo mining or by
              joining a mining pool.
            </Typography>
          </Box>
        </Reveal>
      </Section>

      <Section id='solo-mining' sx={{ py: { xs: 4, md: 6 } }}>
        <SectionHeading
          eyebrow='Getting Started with Mining'
          title='Solo Mining Setup'
          subtitle='Solo mining allows you to mine directly on the Mochimo network without joining a pool. While solo mining rewards are less frequent, you receive the full block reward when you successfully mine a block.'
          maxWidth={720}
        />
        <Grid container spacing={3} alignItems='stretch'>
          {soloMiners.map((miner, i) => (
            <Grid item xs={12} md={6} key={miner.platform} sx={{ display: 'flex' }}>
              <Reveal delay={i * 90} sx={{ width: '100%' }}>
                <GlassPanel hover sx={{ p: { xs: 3, md: 3.5 }, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, mb: 2 }}>
                    <Box
                      sx={{
                        width: 46, height: 46, borderRadius: '12px',
                        display: 'grid', placeItems: 'center',
                        border: fx.hairline, background: 'rgba(45,127,255,0.08)',
                        color: tokens.brand
                      }}
                    >{miner.icon}
                    </Box>
                    <Typography variant='h6' sx={{ fontSize: '1.2rem' }}>{miner.platform}</Typography>
                  </Box>
                  <Typography sx={{ color: tokens.text, fontSize: '0.95rem', mb: 1.5 }}>
                    {miner.description}
                  </Typography>
                  <Typography
                    sx={{
                      color: tokens.textDim,
                      fontFamily: mono,
                      fontSize: '0.78rem',
                      lineHeight: 1.65,
                      p: 1.75,
                      mb: 2.5,
                      borderRadius: '10px',
                      border: fx.hairline,
                      background: 'rgba(0,0,0,0.28)',
                      wordBreak: 'break-word'
                    }}
                  >{miner.instructions}
                  </Typography>
                  <Button
                    variant='outlined' size='small'
                    href={miner.link} target='_blank' rel='noopener'
                    startIcon={<DownloadIcon />}
                  >Download {miner.platform} Miner
                  </Button>
                </GlassPanel>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section id='mining-pools' sx={{ py: { xs: 4, md: 6 } }}>
        <SectionHeading
          eyebrow='Shared Hashrate'
          title='Mining Pools'
          subtitle='Mining pools combine the computing power of multiple miners to increase the chance of finding blocks. Rewards are distributed among participants based on their contributed hashrate. Joining a pool provides more consistent rewards compared to solo mining.'
          maxWidth={760}
        />
        <Grid container spacing={3}>
          {miningPools.map((pool, i) => (
            <Grid item xs={12} key={pool.name}>
              <Reveal delay={i * 90}>
                <GlassPanel sx={{ p: { xs: 3, md: 4 } }}>
                  <Grid container spacing={{ xs: 3, md: 4 }}>
                    <Grid item xs={12} md={5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box
                          component='img' alt={`${pool.name} icon`} src={pool.icon}
                          sx={{
                            width: 52, height: 52, borderRadius: '12px',
                            objectFit: 'cover', border: fx.hairline
                          }}
                        />
                        <Box>
                          <Typography variant='h6' sx={{ fontSize: '1.25rem', lineHeight: 1.2 }}>
                            <Link href={pool.url} target='_blank' rel='noopener' underline='hover' color='inherit'>
                              {pool.name}
                            </Link>
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: '0.72rem',
                              color: tokens.accent,
                              letterSpacing: '0.06em'
                            }}
                          >Fee: {pool.fee}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ color: tokens.textDim, fontSize: '0.94rem', lineHeight: 1.7, mb: 2.5 }}>
                        {pool.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: mono,
                          fontSize: '0.6rem',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: tokens.textFaint,
                          mb: 1
                        }}
                      >Supported OS
                      </Typography>
                      <Stack direction='row' spacing={1}>
                        {pool.supportedOS.map((os) => (
                          <Chip key={os} icon={osIcons[os]} label={os} size='small' variant='outlined' />
                        ))}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Stack spacing={2.5} sx={{ mb: 3 }}>
                        {pool.details.map((d) => (
                          <DetailRow key={d.label} {...d} />
                        ))}
                      </Stack>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: '12px',
                          border: fx.hairline,
                          background: 'rgba(45,127,255,0.06)'
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: display,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            mb: 1
                          }}
                        >How to Join
                        </Typography>
                        <Typography sx={{ color: tokens.textDim, fontSize: '0.9rem', mb: 2 }}>
                          {pool.howToJoin.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                          <Button
                            variant='outlined' size='small'
                            startIcon={<DiscordIcon />}
                            href={pool.howToJoin.discordLink}
                            target='_blank' rel='noopener'
                          >Setup Instructions
                          </Button>
                          <Tooltip title='Join Discord community'>
                            <Button
                              variant='outlined' size='small'
                              startIcon={<DiscordIcon />}
                              href={pool.discord}
                              target='_blank' rel='noopener'
                            >Pool Discord
                            </Button>
                          </Tooltip>
                          <Button
                            variant='outlined' size='small'
                            endIcon={<ArrowForwardIcon />}
                            href={pool.url}
                            target='_blank' rel='noopener'
                          >Pool Dashboard
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </GlassPanel>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
}
