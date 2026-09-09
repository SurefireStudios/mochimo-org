
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import {
  BlockHistory,
  LedgerEntries,
  LedgerHistory,
  RichlistEntries,
  TransactionHistory
} from 'app/component/Results';
import { capitalize } from '../util';
import { scrollToTopNow } from './component/ScrollToTop';

function ResultsLabel (props) {
  return (<Divider sx={{ margin: '1em 0 0.5em 0' }} {...props} />);
}

export default function Explorer ({ type }) {
  let { pathname, search } = useLocation();
  const navigate = useNavigate();
  // Add length limits to prevent ReDoS attacks (128 hex chars = 64 bytes)
  const hexRegex = /^(?:0x)?[0-9a-f]{1,128}$/i;
  const searchRegex = /^(?:0x)?[0-9a-f]{0,128}$/i;

  // determine search query
  search = new URLSearchParams(search);
  search = search.get('search');

  // determine default hint
  let defaultHint;
  switch (type) {
    case 'address':
      defaultHint = 'Type Tag or WOTS+ Address - e.g. c0ffee... / 287a8f...';
      break;
    case 'block':
      defaultHint = 'Type Block Number, Hash or Miner Address - e.g. 0x58a0a / 363018 / 287a8f...';
      break;
    case 'transaction':
      defaultHint = 'Type Transaction ID, Tag or WOTS+ Address - e.g. c0ffee... / 287a8f...';
      break;
    case 'richlist':
      defaultHint = 'Type Rank, Tag or WOTS+ Address - e.g. 123 / c0ffee... / 287a8f...';
      break;
    case 'haiku':
      defaultHint = 'Type Block Number, Hash or Haiku - e.g. "lonely grasshopper"';
      break;
    default:
      defaultHint = 'Type Search Query';
  }

  // state and handlers
  const [invalidQuery, setInvalidQuery] = useState(false);
  const [searchHint, setSearchHint] = useState(defaultHint);
  const handleSearchText = (event) => {
    const { value } = event.target;
    // accept any hexadecimal or blank value
    if (searchRegex.test(value)) {
      setSearchHint(defaultHint);
      setInvalidQuery(false);
    } else {
      setSearchHint('Invalid Characters Detected');
      setInvalidQuery(true);
    }
    /*
    const types = [];
    switch (target) {
      default: setSearchHint(defaultHint);
    }
    */
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // ====================
    const { value } = event.target?.search || {};
    navigate(pathname + '?search=' + value);
    return false;
  };

  useEffect(() => {
    scrollToTopNow();
    document.forms[0].search.value = '';
  }, [pathname]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 2
        }}
      >
        <Typography variant='h1'>
          {type ? capitalize(type) : 'Mochimo'} Explorer
        </Typography>
        {(!type && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: ({ spacing }) => spacing(1),
              paddingBottom: 2
            }}
          >
            <Link to='/explorer/address'>
              <Button variant='contained'>Address</Button>
            </Link>
            <Link to='/explorer/tag'>
              <Button variant='contained'>Tag</Button>
            </Link>
            <Link to='/explorer/block'>
              <Button variant='contained'>Block</Button>
            </Link>
            <Link to='/explorer/transaction'>
              <Button variant='contained'>Transaction</Button>
            </Link>
            <Link to='/explorer/richlist'>
              <Button variant='contained'>Richlist</Button>
            </Link>
          </Box>
        ))}
        <Typography variant='caption' color='textSecondary'>
          {(type === 'address' && 'Find a Mochimo Tag or Address!') ||
          (type === 'block' && 'Find a Mochimo Block!') ||
          (type === 'transaction' && 'Find a Mochimo Transaction!') ||
          (type === 'richlist' && 'Find a Mochimo Rank!') ||
          (type === 'haiku' && 'Find a Mochimo Haiku!') ||
          'Find all the things!'}
        </Typography>
        <Paper
          component='form' onSubmit={handleSubmit} sx={{
            padding: ({ spacing }) => spacing(1),
            width: { xs: '100%', sm: '80%' }
          }}
        >
          <TextField
            autoFocus fullWidth size='small'
            label={searchHint} error={invalidQuery}
            onChange={handleSearchText} InputProps={{
              required: true,
              name: 'search',
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip title='Search' placement='left' arrow>
                    <IconButton type='submit' aria-label='search'>
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </Paper>
        
      </Box>
      {hexRegex.test(search) && (!type || type === 'address') && (
        <>
          <ResultsLabel>Ledger Entries</ResultsLabel>
          <LedgerEntries query={search} />
        </>
      )}
      {((hexRegex.test(search) && !type) || type === 'address') && (
        <>
          <ResultsLabel>
            {search ? 'Ledger History by' : 'Latest Ledger'}
          </ResultsLabel>
          <LedgerHistory query={search} />
        </>
      )}
      {((hexRegex.test(search) && !type) || type === 'block') && (
        <>
          <ResultsLabel>
            {search ? 'Block History by' : 'Latest Blocks'}
          </ResultsLabel>
          <BlockHistory query={search} />
        </>
      )}
      {((hexRegex.test(search) && !type) || type === 'richlist') && (
        <>
          <ResultsLabel>
            {search ? 'Richlist by' : 'Latest Richlist'}
          </ResultsLabel>
          <RichlistEntries query={search} />
        </>
      )}
      {((hexRegex.test(search) && !type) || type === 'transaction') && (
        <>
          <ResultsLabel>
            {search ? 'Transaction History by' : 'Latest Transactions'}
          </ResultsLabel>
          <TransactionHistory query={search} />
        </>
      )}
    </Container>
  );
}
