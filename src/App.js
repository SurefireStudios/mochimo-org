import { forwardRef, lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ScrollToTop from 'app/component/ScrollToTop';
import Header from './app/component/Header';
import baseTheme from 'theme';

import {
  Adq, Exchanges, MeetTheTeam, MobileWalletPrivacy, MobileWalletTerms, Privacy
} from 'app/other';
import Network from 'app/network';
import MFXGlobe from 'app/mfx-globe';
import Status from 'app/status';
import Homepage from 'app/homepage';
import Explorer from 'app/explorer';
import ExplorerBlock from 'app/explorer-block';
import ExplorerLedger from 'app/explorer-ledger';
import Footer from 'app/component/Footer';
import Mining from './app/pages/Mining';
import FAQ from './app/pages/FAQ';
import Vote from './app/pages/Vote';

const BackgroundWave = lazy(() => import('app/component/BackgroundWave'));

const FULL_BLEED = ['/', '/network'];

const LinkForwarder = forwardRef(({ children, ...props }, ref) => {
  return props.href
    ? (<a ref={ref} {...props}>{children}</a>)
    : (<Link ref={ref} {...props}>{children}</Link>);
});

function PageBody ({ children }) {
  const { pathname } = useLocation();
  const bleed = FULL_BLEED.includes(pathname) || pathname.startsWith('/mfx');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flexGrow: 1,
        paddingTop: bleed ? 0 : { xs: '104px', md: '134px' },
        paddingBottom: bleed ? 0 : { xs: 6, md: 10 }
      }}
    >{children}
    </Box>
  );
}

export default function App () {
  const customTheme = useMemo(() => createTheme(baseTheme, {
    components: {
      MuiLink: { defaultProps: { component: LinkForwarder } }
    }
  }), []);

  const mfxTheme = useMemo(() => createTheme(customTheme, {
    palette: { background: { default: 'transparent' } }
  }), [customTheme]);

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='mfx'>
            <Route
              path='globe' element={(
                <ThemeProvider theme={mfxTheme}>
                  <CssBaseline />
                  <MFXGlobe />
                </ThemeProvider>
              )}
            />
          </Route>
          <Route
            path='*' element={(
              <>
                <CssBaseline />
                <Header />
              </>
            )}
          />
        </Routes>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >
          <PageBody>
            <Routes>
              <Route index element={null} />
              <Route path='mfx'>
                <Route path='*' element={null} />
              </Route>
              <Route path='network' element={null} />
              <Route
                path='*' element={(
                  <Suspense fallback={null}>
                    <BackgroundWave />
                  </Suspense>
                )}
              />
            </Routes>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='adq' element={<Adq />} />
              <Route path='mfx'>
                <Route path='*' element={null} />
              </Route>
              <Route path='meet-the-team' element={<MeetTheTeam />} />
              <Route path='exchanges-mcm' element={<Exchanges />} />
              <Route path='privacy-policy' element={<Privacy />} />
              <Route path='mobile-wallet-privacy' element={<MobileWalletPrivacy />} />
              <Route path='mobile-wallet-terms' element={<MobileWalletTerms />} />
              <Route path='status' element={<Status />} />
              <Route path='network' element={<Network />} />
              <Route path='explorer'>
                <Route index element={<Explorer />} />
                <Route path='address'>
                  <Route index element={<Explorer type='address' />} />
                  <Route path=':value' element={<ExplorerLedger type='address' />} />
                </Route>
                <Route path='block'>
                  <Route index element={<Explorer type='block' />} />
                  <Route path=':bnum/:bhash' element={<ExplorerBlock />} />
                  <Route path=':bnum' element={<ExplorerBlock />} />
                </Route>
                <Route path='richlist' element={<Explorer type='richlist' />} />
                <Route path='tag'>
                  <Route index element={<Navigate replace to='/explorer/address' />} />
                  <Route path=':value' element={<ExplorerLedger type='tag' />} />
                </Route>
                <Route path='transaction' element={<Explorer type='transaction' />} />
                <Route path='*' element={<Navigate replace to='/explorer' />} />
              </Route>
              <Route path='mining' element={<Mining />} />
              <Route path='faq' element={<FAQ />} />
              <Route path='vote' element={<Vote />} />
            </Routes>
            </Box>
          </PageBody>
          <Routes>
            <Route path='network' element={null} />
            <Route path='mfx'>
              <Route path='*' element={null} />
            </Route>
            <Route path='*' element={<Footer />} />
          </Routes>
        </Box>
      </BrowserRouter>
      <ScrollToTop />
    </ThemeProvider>
  );
}
