import Web3 from "web3"

const provider=new Web3.providers.HttpProvider(
"http://127.0.0.1:7545"
)

const web3= new Web3(provider)

const abi=[{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"uint256","name":"_budget","type":"uint256"},{"internalType":"string","name":"_addresss","type":"string"},{"internalType":"string","name":"_ownerName","type":"string"}],"name":"addHome","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_homeId","type":"uint256"},{"internalType":"address","name":"_buyerAddress","type":"address"},{"internalType":"string","name":"_buyerName","type":"string"}],"name":"buyHome","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllHomeIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_homeId","type":"uint256"}],"name":"getHome","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"homeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"homes","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"budget","type":"uint256"},{"internalType":"string","name":"addresss","type":"string"},{"internalType":"bool","name":"isSold","type":"bool"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"ownerName","type":"string"}],"stateMutability":"view","type":"function"}]
const vmContract = new web3.eth.Contract(abi, "0x47dead1cE204a4C3Dd036feEc699aE68E1713061")

export default vmContract;

