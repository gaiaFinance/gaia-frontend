import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/bg2.svg';
import useLpStats from '../../hooks/useLpStats';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import useBombStats from '../../hooks/useBombStats';
import TokenInput from '../../components/TokenInput';
import useBombFinance from '../../hooks/useBombFinance';
import { useWallet } from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import { ApprovalState } from '../../hooks/useApprove';
import useProvideBombFtmLP from '../../hooks/useProvideBombFtmLP';
import { Alert } from '@material-ui/lab';
import { Helmet } from 'react-helmet';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
const TITLE = 'gaia.finance |'

const ProvideLiquidity = () => {
  const [bombAmount, setBombAmount] = useState(0);
  const [ftmAmount, setFtmAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const { balance } = useWallet();
  const bombStats = useBombStats();
  const bombFinance = useBombFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const bombBalance = useTokenBalance(bombFinance.GAIA);
  const btcBalance = useTokenBalance(bombFinance.BTC);

  const ftmBalance = (btcBalance / 1e18).toFixed(4);
  const { onProvideBombFtmLP } = useProvideBombFtmLP();
  const bombBnbLpStats = useLpStats('GAIA-BNB-LP');

  const bombLPStats = useMemo(() => (bombBnbLpStats ? bombBnbLpStats : null), [bombBnbLpStats]);
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(2) : null), [bombStats]);
  const ftmPriceInBOMB = useMemo(() => (bombStats ? Number(1 / bombStats.tokenInFtm).toFixed(2) : null), [bombStats]);
  console.log('bombLPStats', bombLPStats)

  // const classes = useStyles();

  const handleBombChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setBombAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setBombAmount(e.currentTarget.value);
    const quoteFromSpooky = await bombFinance.quoteFromSpooky(e.currentTarget.value, 'GAIA');
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / bombLPStats.ftmAmount);
  };

  const handleFtmChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setFtmAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setFtmAmount(e.currentTarget.value);
    const quoteFromSpooky = await bombFinance.quoteFromSpooky(e.currentTarget.value, 'BNB');
    setBombAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / bombLPStats.tokenAmount);
  };
  const handleBombSelectMax = async () => {
    const quoteFromSpooky = await bombFinance.quoteFromSpooky(getDisplayBalance(bombBalance), 'GAIA');
    setBombAmount(getDisplayBalance(bombBalance));
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / bombLPStats.ftmAmount);
  };
  const handleFtmSelectMax = async () => {
    const quoteFromSpooky = await bombFinance.quoteFromSpooky(ftmBalance, 'BNB');
    setFtmAmount(ftmBalance);
    setBombAmount(quoteFromSpooky);
    setLpTokensAmount(ftmBalance / bombLPStats.ftmAmount);
  };
  return (

    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justify="center">
        <Box style={{ width: '600px' }}>
          <Alert variant="filled" severity="warning" style={{ marginBottom: '10px' }}>
            <b>
              This and{' '}
              <a href="https://pancakeswap.finance/" rel="noopener noreferrer" target="_blank">
                Pancakeswap
              </a>{' '}
              are the only ways to provide Liquidity on GAIA-BTCB pair without paying tax.
            </b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{ borderRadius: 15 }}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleBombSelectMax}
                          onChange={handleBombChange}
                          value={bombAmount}
                          max={getDisplayBalance(bombBalance)}
                          symbol={'GAIA'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleFtmSelectMax}
                          onChange={handleFtmChange}
                          value={ftmAmount}
                          max={ftmBalance}
                          symbol={'BTCB'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 GAIA = {bombPriceInBNB} BNB</p>
                        <p>1 BNB = {ftmPriceInBOMB} GAIA</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{ textAlign: 'center' }}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvideBombFtmLP(ftmAmount.toString(), bombAmount.toString())}
                            color="primary"
                            style={{ margin: '0 10px', color: '#fff' }}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="secondary"
                            style={{ margin: '0 10px' }}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;
