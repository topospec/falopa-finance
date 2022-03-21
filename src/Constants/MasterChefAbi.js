export const MasterChefAbi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pid",
                type: "uint256"
            }
        ],
        name: "poolInfo",
        outputs: [
            {
                internalType: "address",
                name: "lpToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "allocPoint",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "lastRewardBlock",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "accFalopaPerShare",
                type: "uint256"
            },
            {
                internalType: "uint16",
                name: "depositFeeBP",
                type: "uint16"
            },
            {
                internalType: "uint256",
                name: "lpSupply",
                type: "uint256"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "userInfo",
        outputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "rewardDebt",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "pendingFalopa",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
]