import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import mammonImage from "../images/mammon.jpg";
import { ReactComponent as EtherSvg } from '../images/ethereum-eth-logo.svg';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'MyFont',
    fontSize: 20
}));

const connectWalletButton = (connectWalletHandler) => {
    return (
      <Button onClick={() => connectWalletHandler()}>
        Connect Wallet
      </Button>
    )
  }

const mintNftButton = (mintNftHandler, mintAmount) => {
    return (
      <Button onClick={() => mintNftHandler(mintAmount)}>
        Mint NFT
      </Button>
    )
  }

export default function BasicGrid(userAccount, expiryTime, totalMints, userNfts, ethEarned, ethUnearned, jackpot, totalSupply, burnNftHandler, connectWalletHandler, mintNftHandler) {
    const [mintAmount, setMintAmount] = React.useState(1);

    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <Grid item xs={9}>
            <Item style={{ height: '90%' }}>
                <h1>Welcome to The Mammon Game</h1>
                <div>The Mammon Game is a blockchain NFT game that brings stable & transparent income to all players.</div>
                <h4>Jackpot == Revenuepot</h4>
                <h1>{jackpot} <EtherSvg height={24} width={24}/> which is equals to ${jackpot * 4000} USD</h1>
            </Item>
        </Grid>
        <Grid item xs={3}>
            <Item style={{ height: '90%' }}>
                <img src={mammonImage} />
            </Item>
        </Grid>
        <Grid item xs={4}>
            <Item style={{ height: '80%' }}>
                <h4>Cost: 10 Wei <EtherSvg height={12} width={12}/> </h4>
                {userAccount ? mintNftButton(mintNftHandler, mintAmount) : connectWalletButton(connectWalletHandler)}
                <TextField id="outlined-basic" label="Amount" variant="outlined" value={mintAmount} onChange={(event) => {setMintAmount(event.target.value)}}/>
            </Item>
        </Grid>
        <Grid item xs={8}>
            <Item style={{ height: '80%' }}>
                <h4>Game End (In Your Local Time):</h4>
                <h1>{expiryTime}</h1>
            </Item>
        </Grid>
        <Grid item xs={12}>
            <Item>
                <ButtonGroup variant="contained" orientation="vertical" aria-label="outlined primary button group">
                    {userNfts.map(function(nft, i){
                        console.log(nft);
                        return <Button key={i} onClick={() => burnNftHandler(nft[1])}>Burn: [Value: {nft[0]} <EtherSvg height={12} width={12}/> #NFT: {nft[1]}]</Button>;
                    })}
                </ButtonGroup>
            </Item>
        </Grid>
        <Grid item xs={12}>  
            <Item>
                <h4>Global Mints</h4>
                <h2>{totalMints}</h2>
                <h4>Current Circulating NFTs</h4>
                <h2>{totalSupply}</h2>
                <h4>Your Total Mints</h4>
                <h2>{userNfts.length} / {totalMints}</h2>
                <h4>Your profits from burning NFTs</h4>
                <h2>{ethEarned}  <EtherSvg height={20} width={20}/> OR ${ethEarned * 4000}</h2>
                <h4>Your uncollected profits from current NFTs</h4>
                <h2>{ethUnearned} <EtherSvg height={20} width={20}/> OR ${ethUnearned * 4000}</h2>
                <h4>Estimated APY (based on past hour minting rate)</h4>
                <h2>7,390,141,198,352,689%</h2>
            </Item>
        </Grid>
        <Grid item xs={12}>
            <Item>
            <h2>How it works</h2>
            <div>1. Mint a NFT.</div>
            <div>2. Hodl the NFT and earn income from subsequent minters.</div>
            <div>3. Burn the NFT to collect the accumulated income or continue to hodl & earn!</div>
            <div>4. Mint even more NFTs to extend the game, collect more income & win the jackpot.</div>
            <div>5. The last person who mints before the game ends earns the jackpot!</div>
            <div>----------------------------------------------------------</div>
            <div>Note: The game will keep extending as more people mint the NFTs, however the time extension will be at a decreasing rate to ensure that the game ends</div>
            </Item>
        </Grid>
        <Grid item xs={12}>
            <Item>Discord: xxx.gg Twitter: yyy.twitter Opensea: zzz.opensea</Item>
        </Grid>
        </Grid>
        </Box>
    );
}
