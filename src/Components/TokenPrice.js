import React, {useState, useEffect} from 'react'
import { FalopaBusdLp } from '../Constants/Contracts';
import { FalopaBusd } from '../Constants/FalopaBusdLpAbi';

const TokenPrice = () => {

    useEffect(() => {
        initData();
    }, [])

    const [price, setPrice] = useState()

    const initData = async () => {
        const tokenContract = await loadContract();
        const price0CumulativeLast = await tokenContract.methods.price0CumulativeLast().call();
        const price1CumulativeLast = await tokenContract.methods.price1CumulativeLast().call();
        const totalSupply = await tokenContract.methods.totalSupply().call();

        const tokenPrice = (price0CumulativeLast / price1CumulativeLast) / (totalSupply / 10**18)

        console.log(tokenPrice)
        setPrice(tokenPrice)

        
    }

    const loadContract = async () => {
        return await new window.web3.eth.Contract(FalopaBusd, FalopaBusdLp);
    }

    return (
        <div>
            <h2>$FALOPA: {price} USD</h2>
        </div>
    )
}

export default TokenPrice
