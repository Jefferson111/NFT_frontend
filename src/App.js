import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/apocalypse.json';
import { ethers } from 'ethers';
import BasicGrid from './components/BasicGrid.js';

const contractAddress = "0xf22D1467C744ba84A874983EC2b4a3e16444e546";
const abi = contract.abi;

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [totalMints, setTotalMints] = useState(0);
  const [userNfts, setUserNfts] = useState(0);
  const [ethEarned, setEthEarned] = useState(0);
  const [ethUnearned, setEthUnearned] = useState(0);
  const [jackpot, setJackpot] = useState(0);
  const [expiryTime, setExpiryTime] = useState('Game has yet to start');
  const [totalSupply, setTotalSupply] = useState(0);

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
      setUserAccount(account);
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
      setUserAccount(accounts[0]);
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
        let nftTxn = await apocalypseContract.mint(1, { value: ethers.utils.parseEther("0.00000000000000001") });

        console.log("Minting... please wait");
        await nftTxn.wait();

        console.log(`Minted, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      } else {
        console.log("Ethereum object does not exist");
      }
      await checkContractStatus();
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
      const totalMints_ = await apocalypseContract.getCurrentTokenId();
      const expiryTime_ = await apocalypseContract.getEndTimestamp();
      const jackpot_ = await apocalypseContract.getJackPot();
      const totalSupply_ = await apocalypseContract.totalSupply();

      if (userAccount != null) {
        const nfts = await apocalypseContract.getTokenIds(ethers.utils.getAddress(userAccount));
        const userNfts_ = await apocalypseContract.balanceOf(ethers.utils.getAddress(userAccount));
        const ethUnearned_ = await apocalypseContract.getTotalRevenueOf(ethers.utils.getAddress(userAccount));
        const ethEarned_ = await apocalypseContract.getTotalClaimedOf(ethers.utils.getAddress(userAccount));

        for (let i = 0; i < nfts.length; i++) {
          const x = await apocalypseContract.getRevenue(nfts[i]._hex); // For further breakdown to display each NFT value
          console.log(ethers.utils.formatEther(x.toBigInt()));
        }

        setEthEarned(ethers.utils.formatEther(ethEarned_.toBigInt()));
        setEthUnearned(ethers.utils.formatEther(ethUnearned_.toBigInt()));
        setUserNfts(userNfts_.toNumber());
      }

      setTotalSupply(totalSupply_.toNumber());
      setJackpot(ethers.utils.formatEther(jackpot_.toBigInt()));
      setTotalMints(totalMints_.toNumber());
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
      {BasicGrid(userAccount, mintNftButton, connectWalletButton, expiryTime, totalMints, userNfts, ethEarned, ethUnearned, jackpot, totalSupply)}
    </div>
  )
}

export default App;
