import React from 'react';

//Graveyard ecosystem logos
import gaiaLogo from '../../assets/logos/gaia.png';
import tShareLogo from '../../assets/logos/gShare-coin-logo.png';
import bombLogoPNG from '../../assets/logos/gaia.png';
import tShareLogoPNG from '../../assets/logos/gShare-coin-logo.png';
import tBondLogo from '../../assets/logos/gbond.png';

import bombFtmLpLogo from '../../assets/logos/gShare-coin-logo.png';
import bshareFtmLpLogo from '../../assets/logos/gaia.png';

import bnbLogo from '../../assets/img/bnb.png';
import btcLogo from '../../assets/img/BCTB-icon.png';

const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  GAIA: gaiaLogo,
  BOMBPNG: bombLogoPNG,
  BSHAREPNG: tShareLogoPNG,
  GSHARE: tShareLogo,
  GBOND: tBondLogo,
  WBNB: bnbLogo,
  BOO: bnbLogo,
  SHIBA: bnbLogo,
  ZOO: bnbLogo,
  CAKE: bnbLogo,
  SUSD: bnbLogo,
  SBTC: btcLogo,
  BTCB: btcLogo,
  BTC: btcLogo,
  SVL: bnbLogo,
  BUSD: bnbLogo,
  'GAIA-WBNB-LP': bombFtmLpLogo,
  'GAIA-BTCB-LP': bombFtmLpLogo,
  'GSHARE-WBNB-LP': bshareFtmLpLogo,
  'GSHARE-BNB-APELP': bshareFtmLpLogo,
  'GAIA-BTCB-APELP': bombFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 64}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
