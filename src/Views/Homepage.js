import React, {useState, useEffect} from 'react'
import Web3 from 'web3';
import Farms from '../Components/Farms';
import { FalopaAddress } from '../Constants/Contracts';
import { FalopaTokenAbi } from '../Constants/FalopaTokenAbi';
import { farms } from '../Constants/Farms';
//...
import '../Assets/stylesheets/app.css'
import logo from '../Assets/images/logo.png'
import TokenPrice from '../Components/TokenPrice';
import { FalopaBusdLp } from '../Constants/Contracts';
import { FalopaBusd } from '../Constants/FalopaBusdLpAbi';


const Homepage = () => {

    useEffect(() => {
        // loadWeb3();
    }, [])

    const ethereum = window.ethereum;
    const [loading, setLoading] = useState();
    const [connected, setConnected] = useState();
    const [address, setAddress] = useState();
    const [contract, setContract] = useState();
    const [balance, setBalance] = useState();

    const loadWeb3 = async () => {
        if (ethereum) {
            await ethereum.enable();
            window.web3 = new Web3(window.ethereum);
            console.log('Metamask is installed :)')
            return true;
        } else {
            console.log('Please install Metamask.')
            return false;
        }
    }

    const handleConnect = async () => {
        setLoading(true);
        console.log('connecting...')
        const hasWeb3 = await loadWeb3();
        console.log("hasweb3", hasWeb3)
        if (!hasWeb3) return;
        const account = await getCurrentAccount();
        console.log("web3 available", account);
        const tokenContract = await loadToken();
        setContract(tokenContract);
        const tokenBal = await tokenContract.methods.balanceOf(account).call();
        console.log('Your FALOPA balance is:', tokenBal);

        setAddress(account);
        setBalance(tokenBal);
        setLoading(false);
        setConnected(true);
    }

    const getCurrentAccount = async () => {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        return accounts[0];
    }

    const loadToken = async () => {
        return await new window.web3.eth.Contract(FalopaTokenAbi, FalopaAddress);
    }


    return (
        <div className='main'>
            <img src={logo} />
            <br />
            {connected ? <TokenPrice /> : <></> }
            {!connected ? <>
            <button
                onClick={() => handleConnect()}
            > Connect </button>
            </> : <></>}
            <br />
            {connected ? <>
                <h2>Account: {address}</h2>
                <h2>Balance: {(parseInt(balance) / 10**18).toFixed(2)}</h2>
                <br />
                {farms.map((item, i) => <Farms farm={item} account={address}/>)}
                
            </> : <><h2>Please connect your wallet on BNB Chain</h2></>}

        </div>
    )
}

export default Homepage
