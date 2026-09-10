import { useEffect } from 'react';
import { Box, Button, CircularProgress, Container, Link, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';

import { scrollToTopNow } from '../component/ScrollToTop';
import { Address, Amount } from '../component/Types';
import DiscordIcon from '../icons/DiscordIcon';
import { useGetChainQuery } from 'api';
import { Reveal, GlassPanel, Eyebrow } from '../component/Section';
import { tokens, fx, mono } from 'theme';

const REMAINING_INSTAMINE = 'de77cd98749f9ed61662a09cdf59db622ae8150ea2b9ec35d15c4bd5f204822a';

function Card ({ question, children }) {
  return (
    <GlassPanel hover sx={{ p: { xs: 2.75, md: 3.25 } }}>
      <Typography
        variant='h6'
        sx={{ fontSize: '1.08rem', mb: 1.75, color: tokens.text, lineHeight: 1.4 }}
      >{question}
      </Typography>
      <Box
        sx={{
          color: tokens.textDim,
          fontSize: '0.92rem',
          lineHeight: 1.72,
          '& strong': { color: tokens.text },
          '& ol, & ul': { pl: 2.5, my: 1 },
          '& li': { mb: 0.75 }
        }}
      >{children}
      </Box>
    </GlassPanel>
  );
}

export default function FAQ () {
  const chain = useGetChainQuery();

  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth='lg' sx={{ pb: { xs: 4, md: 8 } }}>
      <Reveal>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>Answers</Eyebrow>
          </Box>
          <Typography
            variant='h1'
            sx={{ fontSize: { xs: '2.2rem', sm: '2.9rem', md: '3.5rem' }, mb: 2 }}
          >
            <Box component='span' sx={fx.textGradient}>Frequently Asked Questions</Box>
          </Typography>
          <Typography
            sx={{ color: tokens.textDim, fontSize: '1.05rem', maxWidth: 560, mx: 'auto' }}
          >Have questions about Mochimo? We have answers!
          </Typography>
        </Box>
      </Reveal>

      <Reveal delay={80}>
        <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2.5} sx={{ margin: 0 }}>
          <Card question="What's the supply statistics?">
            Mochimo's supply is fairly simply split into 2 categories.
            <ol>
              <li>
                <strong>Instamine Supply (<Amount value='4757066000000000' />)</strong>
                <br />
                The Instamine (not to be confused with a "premine") existed as a
                single ledger entry of Mochimo's Genesis Block. This instamine
                was split into it's predetermined allocations during the early
                days of the Blockchain.
                <br /><br />
                <Address href short wots={REMAINING_INSTAMINE} /> currently holds
                the largest remainder of the instamine, which is controlled by
                the Mochimo Foundation, and is LOCKED by contractual agreement
                until 25th June 2023.
              </li>
              <br />
              <li>
                <strong>
                  Mineable Supply (
                  {(chain.isFetching && (<span> <CircularProgress size='1em' /> </span>)) || (
                    <Amount value={((chain.data?.maxsupply || 76493180.0616804) * 1e+9) - 4757066000000000} />
                  )})
                </strong>
                <br />
                The Mineable supply can be described simply as Mochimo that is
                rewarded to a "miner" for solving a block on the Blockchain. The
                distribution of these rewards over the life of the Mochimo
                Blockchain is explained and illustrated in a fantastic&nbsp;
                <Link href='https://medium.com/mochimo-official/of-time-and-tide-the-mochimo-cryptocurrency-emission-curve-9bbe30b9b02e' target='_blank' rel='noopener noreferrer'>
                  Medium Article
                </Link>.
                <br />
                In summary...
                <ul>
                  <li>Reward (@ 0x01): <Amount value={5000000000} /></li>
                  <ul><li> +<Amount value={56000} /> / block</li></ul>
                  <li>Reward (@ 0x4321): <Amount value={5917392000} /></li>
                  <ul><li> +<Amount value={150000} /> / block</li></ul>
                  <li>Reward (@ 0x5B402): <Amount value={59523942000} /></li>
                  <ul><li> -<Amount value={28488} /> / block</li></ul>
                  <li>Reward (@ 0x200000): <Amount value={0} /></li>
                  <ul><li>mining distribution finalized</li></ul>
                  <ul><li>txfees sustain network</li></ul>
                </ul>
              </li>
            </ol>
          </Card>

          <Card question='How is the Instamine used?'>
            The majority of the Instamine was allocated to the original Mochimo
            Development Team. The team spent years creating a cryptocurrency
            platform that solves almost every major issue with Bitcoin to date.
            Therefore, this allocation serves as a fee (in MCM) for that work.
            The fee is equal to approximately 4.46% of the fully diluted Mochimo
            supply.
            <br /><br />
            For the extended breakdown of Instamine distribution...
            <br /><br />
            <strong>Mochimo Foundation (<Amount value={1557066000000000} />):</strong>{' '}
            these funds are used at the discretion of the foundation for
            marketing costs, bounties, and ongoing support of the network.
            <br /><br />
            <strong>Matt Zweil (<Amount value={1919999999991500} />):</strong>{' '}
            Mochimo's founder, architect, and only remaining Development Team
            member whose coins remain controlled by The Mochimo Foundation.
            These coins are LOCKED until 25th June 2023, exactly 5 years from
            the launch date of Mochimo.
            <br /><br />
            <strong>Development Team (<Amount value={1280000000008000} />):</strong>{' '}
            effective 25th June 2019, the original 2-year lock on the Developer
            Team coins has expired. The coins and their intended sale dates are
            no longer tracked or listed on the Mochimo Wiki, as they are now
            privately controlled and considered apart of the circulating supply.
          </Card>

          <Card question='When was the first block solved?'>
            As per Blockchain data pulled directly from the network nodes, the
            first block was solved on Monday, June 25, 2018 3:43:45 PM, or
            2018-06-18T15:43:45+00:00 (ISO timestamp).
          </Card>

          <Card question='Did Mochimo have an ICO or other pre-Mainet investment phase?'>
            No. The decision to forego any sort of pre–launch investment in the
            coin was made to avoid the legal and regulatory issues that would
            have arisen. Furthermore,&nbsp;
            <Link href='https://discord.com/channels/460867662977695765/512709057497530369/606879821548617737' target='_blank' rel='noopener noreferrer'>
              Mochimo is money...
            </Link>
          </Card>

          <Card question='Do I need the blockchain history to transact directly with the network?'>
            No. Somewhat importantly, performing a transaction on the Mochimo
            Network DOES NOT require access to the blockchain. This allows
            Wallets, Exchanges, Third-Party Applications and Payment Providers
            to swiftly operate on the network without pre-requisite access to
            the blockchain.
          </Card>

          <Card question='How did you implement quantum resistance, anyhow?'>
            We checked out the algorithms that were peer reviewed and
            acknowledged by the EU backed Quantum Research group PQCRYPTO and
            chose the WOTS+ algorithm. We then wrote and vetted our quantum code
            with the algorithm's originator: Andreas Hülsing. The penalty of
            adopting quantum signatures is their size, but we've already solved
            that problem with our ChainCrunch™ tech.
          </Card>

          <Card question='How long does it take to set up a Mochimo mining node?'>
            Several minutes on high performance hardware, but it is known to
            take around 20 minutes on tiny 1vCPU server nodes.
          </Card>

          <Card question='Where do I store my MCM?'>
            Mochimo can currently be stored in the cross-platform "Mojo" wallet,
            with Mobile / Web Wallets, and hardware wallet integrations in the
            works...
          </Card>

          <Card question='What exchanges are you on?'>
            The list of exchanges that Mochimo is currently on can be found on
            the MCM Exchanges page. Regularly check back in Discord and the
            exchange page for updates.
          </Card>
        </Masonry>
      </Reveal>

      <Reveal delay={120}>
        <GlassPanel
          sx={{
            mt: { xs: 5, md: 7 },
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            background: 'linear-gradient(150deg, rgba(0,89,255,0.16), rgba(0,217,255,0.05) 55%, rgba(255,255,255,0.015))'
          }}
        >
          <Typography
            variant='h3'
            sx={{ fontSize: { xs: '1.7rem', md: '2.3rem' }, mb: 1.25 }}
          >Need more answers about Mochimo?
          </Typography>
          <Typography
            sx={{
              fontFamily: mono,
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              color: tokens.textDim,
              mb: 3.5
            }}
          >Come join the community
          </Typography>
          <Button
            variant='contained' size='large'
            href='https://discord.mochimo.org/'
            target='_blank' rel='noopener noreferrer'
            startIcon={<DiscordIcon />}
          >Mochimo Official Discord
          </Button>
        </GlassPanel>
      </Reveal>
    </Container>
  );
}
