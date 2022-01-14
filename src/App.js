import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/apocalypse.json';
import { ethers } from 'ethers';
import BasicGrid from './components/BasicGrid.js';

const contractAddress = "0xb97F583eB62B69246fA9382cEAB2Fd97dA6C8536";
const abi = contract.abi;

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentMints, setCurrentMints] = useState(0);
  const [currentNfts, setCurrentNfts] = useState(0);
  const [expiryTime, setExpiryTime] = useState('Game has yet to start');

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const apocalypseContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await apocalypseContract.mint({ value: ethers.utils.parseEther("0.005") });

        console.log("Minting... please wait");
        await nftTxn.wait();

        console.log(`Minted, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button' style={{fontFamily: 'MyFont', fontSize: 20}}>
        Mint NFT
      </button>
    )
  }

  const checkContractStatus = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const apocalypseContract = new ethers.Contract(contractAddress, abi, provider);

      console.log("Start reading stats");
      const currentMints_ = await apocalypseContract.getCurrentTokenId();
      const currentNfts_ = await apocalypseContract.totalSupply();
      const expiryTime_ = await apocalypseContract.getExpiration();

      setCurrentMints(currentMints_.toNumber());
      setCurrentNfts(currentNfts_.toNumber());
      const myDate = new Date(expiryTime_.toNumber() * 1000);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      setExpiryTime(myDate.toLocaleString("en-US", options));
    }
  }

  useEffect(() => {
    checkWalletIsConnected();
    checkContractStatus();
  }, [])

  return (
    <div className='main-app'>
      {BasicGrid(currentAccount, mintNftButton, connectWalletButton, expiryTime, currentMints, currentNfts)}
    </div>
  )
}

export default App;
