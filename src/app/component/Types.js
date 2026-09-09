
import React from 'react';
import { Link, Tooltip, Typography } from '@mui/material';
import { capitalize, isTagged } from '../../util';

const swaplist = [
  { id: /\bw/gi, with: 'ω' },
  { id: /\bt/gi, with: 'τ' },
  { id: /\bb/gi, with: 'β' }
];

const clipboardCopy = async (text) => {
  return 'clipboard' in navigator
    ? await navigator.clipboard.writeText(text)
    : document.execCommand('copy', true, text);
};

// forced inline Typography
const Inline = React.forwardRef(function Inline (props, ref) {
  return (
    <Typography fontSize='inherit' component='span' display='inline' ref={ref} {...props} />);
});

export function Address ({ short, tag, wots, ...props }) {
  return (isTagged(tag)
    ? (short
        ? <Properties {...props} tag={tag} />
        : <Properties {...props} tag={tag} wots={wots} />)
    : <Properties {...props} short={short} wots={wots} />
  );
}

export function Amount
({ decimals, forceSign, offset = 1e+9, noLocale, noSuffix, noUnits, value }) {
  const valueStr = value &&
    (value / offset).toLocaleString(undefined, {
      minimumFractionDigits: 9
    });

  const MILLION_C = offset * 1e+6;
  const THOUSAND_C = offset * 1e+3;
  const MILLI_C = offset / 1e+3;
  const NANO_C = offset / 1e+9;
  // determine sign and make value absolute
  const sign = Number(value) < 0 ? -1 : 1;
  let amount = Number(value) * sign;
  let options = {};
  // compare amount against predetermined breakpoints
  if (amount > MILLION_C) options = { reduce: MILLION_C, dec: 1, suffix: '𝕄' };
  else if (amount > THOUSAND_C) options = { reduce: THOUSAND_C, dec: 2, suffix: 'κ' };
  else if (amount < MILLI_C) options = { reduce: NANO_C, suffix: 'η' };
  else options = { reduce: offset };
  // force specific options
  if (typeof decimals === 'number') options.dec = decimals;
  if (noSuffix) options.reduce = 1e+9;
  // apply options
  amount *= sign;
  if (options.reduce) amount /= options.reduce;
  if (options.dec) {
    const powFactor = Math.pow(10, options.dec || 0);
    amount = Math.floor(amount * powFactor) / powFactor;
  }
  if (!noLocale) {
    amount = amount.toLocaleString(undefined, options.dec
      ? { minimumFractionDigits: options.dec }
      : undefined);
  }
  // return MCMSuffix JSX in a span
  return (
    <span title={valueStr + (noUnits ? '' : ' Mochimo')}>
      {forceSign && sign > 0 && '+'}
      {amount}
      {amount !== '0' && !noSuffix && value && (
        options.suffix ? options.suffix : ''
      )}
      {noUnits ? '' : ' MCM'}
    </span>
  );
}

export function Bytes ({ bytes = 0, noPrefix, noLocale, ...props }) {
  const units = ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi']; // binary
  // determine units index via binary base log calculation
  const uIndex = Math.min(noPrefix ? 0 : parseInt(Math.log2(bytes) / 10), 8);
  // shift binary representation of bytes to appropriate value
  const amount = bytes >>> (uIndex * 10);
  // return BytesSuffix JSX in a span
  return (
    <Inline
      variant='inherit' title={`${bytes.toLocaleString()} Bytes`} {...props}
    >{noLocale ? amount : amount.toLocaleString()} {units[uIndex]}Bytes
    </Inline>
  );
}

let PUID = 0;
export function Properties
({ children = [], copy, href, inline, pre, short, ...data }) {
  let count = 0;
  for (const key in data) {
    let id = capitalize(key);
    let value = data[key];
    let shortened = false;
    let to = false;
    if (href && !value) href = false;
    if (href) {
      switch (key) {
        case 'txid': to = '/explorer/transaction/' + value; break;
        case 'wots': to = '/explorer/address/' + value.slice(0, 64); break;
        case 'tag': to = '/explorer/tag/' + value; break;
        default: to = false;
      }
    }
    if (short && value?.length > 24) {
      shortened = true;
      value = value.slice(0, 24);
    }
    for (const replace of swaplist) {
      id = id.replace(replace.id, replace.with);
    }
    if (count++) children.push(<span key={`props-${PUID++}`}> • </span>);
    children.push(
      <Inline key={`props-${PUID++}`} color='textSecondary'>
        {id}:&nbsp;
      </Inline>
    );
    if (copy) {
      children.push(
        <Tooltip key={`props-${PUID++}`} title='Copy to Clipboard' placement='right' arrow>
          <Inline
            style={{ cursor: 'pointer' }}
            onClick={() => clipboardCopy(data[key])}
          >{value || '---'}{(shortened ? '...' : '')}
          </Inline>
        </Tooltip>
      );
    } else if (href) {
      children.push(
        <Link key={`props-${PUID++}`} to={to}>
          <Inline component='span'>
            {value || '---'}{(shortened ? '...' : '')}
          </Inline>
        </Link>
      );
    } else {
      children.push(
        <Inline key={`props-${PUID++}`} component='span'>
          {value || '---'}{(shortened ? '...' : '')}
        </Inline>
      );
    }
  }
  const props = { children, style: { width: '100%' } };
  if (inline) props.display = 'inline';

  return (
    <Typography noWrap {...props}>
      {(pre && (
        <Inline key={`props-${PUID++}`} color='textSecondary'>
          {pre}:&nbsp;
        </Inline>
      ))}{children}
    </Typography>
  );
}
