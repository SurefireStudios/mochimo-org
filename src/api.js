
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { geodist } from './util';

export const CoingeckoApi = createApi({
  reducerPath: 'CoingeckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
  endpoints: (builder) => ({
    getPrice: builder.query({
      query: () => 'simple/price?ids=mochimo&vs_currencies=usd'
    })
  })
});

export const GithubApi = createApi({
  reducerPath: 'GithubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getContributors: builder.query({
      query: (params) => `repos/${params.owner}/${params.repo}/contributors`
    })
  })
});

const regions = [
  { name: 'deu-api', lat: 52.520008, lng: 13.404954, dist: Math.random() },
  { name: 'sgp-api', lat: 1.290270, lng: 103.851959, dist: Math.random() },
  { name: 'usc-api', lat: 38.627003, lng: -90.199402, dist: Math.random() }
];
const regionHost = 'mochimap.com';
const regionPreference = { regions, sorted: false };
const regionPreferenceBaseQuery = retry(
  async (...args) => {
    // check available region order
    if (regionPreference.sorted === false) {
      if (regionPreference.promise) await regionPreference.promise;
      else {
        await (regionPreference.promise = new Promise((resolve) => {
          /* eslint-disable-next-line no-undef */
          fetch('/', { method: 'HEAD' })
            .then(({ headers }) => {
              if (headers.has('x-geo-loc')) {
                const loc = headers.get('x-geo-loc');
                const [nlat, nlng] = loc.split(',').map((n) => +n);
                regionPreference.regions.forEach((r) => {
                  // recalculate distances
                  r.dist = geodist(nlat, nlng, r.lat, r.lng);
                });
              }
            }).catch((error) => {
              // Log error but continue with default region ordering
              if (process.env.NODE_ENV === 'development') {
                console.error('Failed to fetch geo-location:', error);
              }
            }).finally(() => {
              // sort regions based on distances
              regionPreference.regions.sort((a, b) => {
                return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0;
              });
              // set sorted true
              regionPreference.sorted = true;
              // resolve
              resolve();
            });
        }));
      }
    }

    let result;
    // attempt fetches from regions in order
    for (const region of regionPreference.regions) {
      // build URL and await fetch
      const baseUrl = `https://${region.name}.${regionHost}`;
      result = await fetchBaseQuery({ baseUrl })(...args);
      // determine results
      if (result.data) break;
      if (result.error?.status >= 400 && result.error?.status < 499) {
        // BAD / NO RESULTS - halt retries
        retry.fail(result.error);
        break;
      }
    }

    // return result
    return result;
  },
  { maxRetries: 1 }
);

export const MochimapApi = createApi({
  reducerPath: 'MochimapApi',
  baseQuery: regionPreferenceBaseQuery,
  endpoints: (builder) => ({
    getBase: builder.query({ query: (params) => '' }),
    getBlocks: builder.query({
      query: (params) =>
        `block${params?.bnum
          ? `/${params.bnum}${params?.bhash ? `/${params.bhash}` : ''}`
          : ''}${params?.search ? `?${params.search}` : ''}`
    }),
    getChain: builder.query({
      query: (params) =>
        `chain${params?.bnum ? `/${params.bnum}` : ''}` +
        (params?.bparam ? `/${params?.bparam}` : '')
    }),
    getLedgerEntry: builder.query({
      query: (params) => `balance/${params.type}/${params.value}`
    }),
    getLedgerHistory: builder.query({
      query: (params) =>
        `ledger${params?.type
        ? `/${params.type}${params?.value ? `/${params.value}` : ''}`
        : ''}${params?.search ? `?${params.search}` : ''}`
    }),
    getNetwork: builder.query({
      query: () => 'network/active'
    }),
    getRichlist: builder.query({
      query: (params) => `richlist?${params?.search}`
    }),
    getTransactions: builder.query({
      query: (params) =>
        `transaction${params?.type
          ? `/${params.type}${params?.value ? `/${params.value}` : ''}`
          : ''}${params?.search ? `?${params.search}` : ''}`
    })
  })
});

export const {
  useGetPriceQuery
} = CoingeckoApi;
export const {
  useGetContributorsQuery
} = GithubApi;
export const {
  useGetBaseQuery,
  useGetBlocksQuery,
  useGetChainQuery,
  useGetLedgerEntryQuery,
  useGetLedgerHistoryQuery,
  useGetNetworkQuery,
  useGetRichlistQuery,
  useGetTransactionsQuery
} = MochimapApi;
