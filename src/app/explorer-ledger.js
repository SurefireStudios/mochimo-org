
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CircularProgress, Container, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

import { useGetLedgerEntryQuery, useGetPriceQuery } from 'api';
import { Amount, Properties } from 'app/component/Types';
import { BlockHistory, LedgerHistory, TransactionHistory } from 'app/component/Results';
import { capitalize, isTagged } from '../util';

const Blank = '---';

export default function ExplorerLedger ({ type }) {
  const { value } = useParams();
  const [tab, setTab] = useState('txs');
  const ledger = useGetLedgerEntryQuery({ type, value });
  const price = useGetPriceQuery();
  const handleTab = (e, selectedTab) => { setTab(selectedTab); };

  const { balance } = ledger.data || {};
  const usdprice = (price.data?.mochimo.usd || 0).toLocaleString();
  const usdbalance = ((price.data?.mochimo.usd || 0) * (balance / 1e+9)).toLocaleString();
  const tagged = isTagged(ledger.data?.tag);

  return (
    <Container sx={{ position: 'relative', padding: ({ spacing }) => spacing(2) }}>
      <Grid container spacing={2}>
        <Grid item sm={3} display={{ xs: 'none', sm: tagged ? 'none' : 'block' }} />
        {(tagged && (
          <Grid item xs={12} sm={6} align='center'>
            {(ledger.data?.tag && (
              <>
                <QRCode size={240} includeMargin value={ledger.data.tag} />
              </>
            )) || (
              <Typography align='center'>
                Waiting for Tag data
              </Typography>
            )}
          </Grid>
        ))}
        <Grid item xs={12} sm={6} align='center'>
          <Card sx={{ padding: ({ spacing }) => spacing(2) }}>
            {ledger.isFetching
              ? (<CircularProgress size='6rem' color='secondary' />)
              : (
                <Typography variant='h1' fontFamily='Roboto Mono'>
                  {ledger.isError
                    ? (<ErrorIcon />)
                    : (<Amount value={ledger.data.balance} noUnits />)}
                </Typography>
                )}
            <Divider style={{ width: '100%' }}>Ledger Details</Divider>
            <Properties copy short wots={ledger.data?.address} />
            <Properties copy tag={ledger.data?.tag} />
            <Properties
              balance={(ledger.data?.balance && (
                <Amount noSuffix decimals={9} value={ledger.data?.balance} />
              )) || Blank}
            />
            <Properties value={`$${usdbalance}`} price={`$${usdprice}/MCM`} />
          </Card>
        </Grid>
        <Grid item sm={3} display={{ xs: 'none', sm: tagged ? 'none' : 'block' }} />
        <Grid item xs={12}>
          <Divider>{capitalize(type)} History by</Divider>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Tabs
              centered
              value={tab}
              onChange={handleTab}
              textColor='primary'
              indicatorColor='secondary'
              aria-label='ledger details tabs'
            >
              <Tab label='Solves' value='solves' />
              <Tab label='Transactions' value='txs' />
              <Tab label='Ledger' value='ledger' />
            </Tabs>
            {tab === 'solves' && (<BlockHistory maddr={value} />)}
            {tab === 'txs' && (<TransactionHistory {...{ type, value }} />)}
            {tab === 'ledger' && (<LedgerHistory {...{ type, value }} />)}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
