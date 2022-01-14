import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
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

export default function BasicGrid(currentAccount, mintNftButton, connectWalletButton, expiryTime, currentMints, currentNfts) {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <Grid item xs={9}>
            <Item style={{ height: '90%' }}>
                <h1>Welcome to The Mammon Game</h1>
                <div>The Mammon Game is a blockchain NFT game that brings stable & transparent income to all players.</div>
                <h4>Jackpot</h4>
                <h1>4,039,112 <EtherSvg height={24} width={24}/> which is equals to $1,206,857,946 USD</h1>
            </Item>
        </Grid>
        <Grid item xs={3}>
            <Item style={{ height: '90%' }}>
                <img src={mammonImage} />
            </Item>
        </Grid>
        <Grid item xs={4}>
            <Item style={{ height: '80%' }}>
                <h4>Cost: 0.05 <EtherSvg height={12} width={12}/> </h4>
                {currentAccount ? mintNftButton() : connectWalletButton()}
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
                <h4>Number of Mints</h4>
                <h2>{currentMints}</h2>
                <h4>Current Circulating NFTs</h4>
                <h2>{currentNfts}</h2>
                <h4>Your Total Mints</h4>
                <h2>7 / {currentMints}</h2>
                <h4>Your Total NFTs (excludes burned NFTs)</h4>
                <h2>5 / {currentNfts}</h2>
                <h4>Your Net Value of Total NFTs (excludes burned NFTs)</h4>
                <h2>76.21 <EtherSvg height={20} width={20}/> OR $316,721</h2>
                <h4>Estimated APY (based on past hour minting rate)</h4>
                <h2>7,390,141,198,352,689%</h2>
            </Item>
            {/*
            <TableContainer>
                <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell>Number of Mints</TableCell>
                        <TableCell>{currentMints}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Current Circulating NFTs</TableCell>
                        <TableCell>{currentNfts}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Your Total Mints</TableCell>
                        <TableCell>7 / {currentMints}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Your Total NFTs (excludes burned NFTs)</TableCell>
                        <TableCell>5 / {currentNfts}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Your Net Value of Total NFTs (excludes burned NFTs)</TableCell>
                        <TableCell>76.21 <EtherSvg height={12} width={12}/> OR $316,721</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Estimated APY (based on past hour minting rate)</TableCell>
                        <TableCell>7,390,141,198,352,689%</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            */}
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
