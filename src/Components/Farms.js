import React, { useState, useEffect } from 'react'
import { farms } from '../Constants/Farms'
import { MasterChefAbi } from '../Constants/MasterChefAbi'
import { MasterChef } from '../Constants/Contracts'
import { FalopaBusd } from '../Constants/FalopaBusdLpAbi'

const Farms = ({ farm, account }) => {

    useEffect(() => {
        initData();
    }, [])

    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState();
    const [lp, setLp] = useState();
    const [fee, setFee] = useState();
    const [approved, setApproved] = useState(false);
    const [contract, setContract] = useState();
    const [balance, setBalance] = useState();
    const [staked, setStaked] = useState();
    const [reward, setReward] = useState();
    const [acc, setAcc] = useState();
    const [pending, setPending] = useState();

    const initData = async () => {
        const tokenContract = await loadFarms();
        setContract(tokenContract);
        const farmsInfo = await tokenContract.methods.poolInfo(farm.pid).call();
        const lpContract = await new window.web3.eth.Contract(FalopaBusd, farmsInfo.lpToken);
        const balance = await lpContract.methods.balanceOf(account).call();
        console.log(farmsInfo);
        setLp(farmsInfo.lpToken)
        setFee(farmsInfo.depositFeeBP)
        setAcc(farmsInfo.accFalopaPerShare)
        setLoading(false);
        setCurrent(farmsInfo);
        setBalance(balance / 1000000000000000000)
        // setFarms(farmsInfo);
        // await handleGetLpBalance();
        await handleUserInfo();
        await handleGetPendingRewards();
    }

    const loadFarms = async () => {
        return await new window.web3.eth.Contract(MasterChefAbi, MasterChef);
    }

    const handleApprove = async () => {
        console.log('approve for: ', farm.address);
        const tokenContract = await new window.web3.eth.Contract(FalopaBusd, lp);
        //await nftContract.methods.mint(1).send({ from: account });
        const approve = await tokenContract.methods.approve( MasterChef, '10000000000000000000').send({ from: account });
        console.log(approve)
        setApproved(approve.status);
    }

    const handleGetLpBalance = async () => {
        const tokenContract = await new window.web3.eth.Contract(FalopaBusd, lp);
        const balance = await tokenContract.methods.balanceOf(account).call();
        setBalance(balance / 1000000000000000000)
        console.log('balance: ', balance)
    }

    const handleDeposit = async () => {
        console.log('depositing for: ', farm.address)
        const tokenContract = await new window.web3.eth.Contract(MasterChefAbi, MasterChef);
        const deposit = await tokenContract.methods.deposit(farm.pid, '5000000000000000000').send({from: account});
        console.log(deposit);
    }

    const handleUserInfo = async () => {
        console.log('getting info for user: ', account)
        const tokenContract = await new window.web3.eth.Contract(MasterChefAbi, MasterChef);
        const userInfo = await tokenContract.methods.userInfo(farm.pid, account).call()
        console.log(userInfo);
        setStaked(userInfo.amount / 1000000000000000000)
        setReward((userInfo.amount * userInfo.rewardDebt) - acc)
    }

    const handleGetPendingRewards = async () => {
        console.log('getting pending rewards for: ', account)
        const tokenContract = await new window.web3.eth.Contract(MasterChefAbi, MasterChef);
        const userRewards = await tokenContract.methods.pendingFalopa(farm.pid, account).call();
        console.log('user rewards: ', userRewards)
        setPending(userRewards/1000000000000000000)
    }

    return (
        <div>
            {loading ? <></> : <>
            <h4>{farm.pid} - {farm.symbol}</h4>
                <h5>LP Address: {lp}</h5>
                <h5>Deposit Fee (%): {fee/100} % </h5>
                <h5>LP Balance: {balance}</h5>
                <h5>Staked: {staked}, Reward: {parseInt(pending)}</h5>
                <button
                    onClick={() => handleApprove()}>
                    Approve
                </button>
                <button
                    onClick={() => handleDeposit()}>
                    Deposit
                </button>
                <br />
            </>}
        </div>
    )
}

export default Farms
