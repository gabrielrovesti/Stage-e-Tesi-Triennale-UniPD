import React,{useState} from "react";
import { UserContext } from "./App";
import { weiToeth } from "./../hooks/web3utils";
import { ethTowei } from "./../hooks/web3utils";

const Main = ({getStakeTokens, getUnstakeTokens, unstakeTokens}) => {
  const contractData = React.useContext(UserContext);
  const [amount, setAmount] = useState('')
  
  const { stakingBalance, rwdBalance, tetherBalance } = contractData;

  const stakingBal = stakingBalance ? stakingBalance : "";

  const rwdBal = rwdBalance ? rwdBalance : "";

  const tetherBal = tetherBalance ? tetherBalance : "";



  return (
    <>
      <div className="container">
        <div>
          <h4 className="font-bold">Staking Balance</h4>
          <h6 className="font-exbold"> {weiToeth(stakingBal)} USDT</h6>
        </div>
        <div>
          <h4 className="font-bold">Reward Balance</h4>
          <h6 className="font-exbold">{weiToeth(rwdBal)} RWD</h6>
        </div>
      </div>
      <div className="card">
        <div className="between">
          <div>
            <h4 className="font-bold">Stake Tokens</h4>
            <h6 className="font-exbold">0</h6>
          </div>
          <div>
            <h4 className="font-bold">Balance:</h4>
            <h6 className="font-exbold">{weiToeth(tetherBal)} ETH</h6>
          </div>
        </div>
        <form onSubmit = {event => {
          event.preventDefault()
          let stakeAmount = amount.toString()
          const stakeCoins = ethTowei(stakeAmount)
          getStakeTokens(stakeCoins)
        }}>
        <div className="form between">
          <input type='text' value={amount} onChange={(e) => setAmount(e.currentTarget.value)} className="form__input" placeholder="Type amount..." />
          <div className="btn btn__secondary">
            <p>USDT</p>
          </div>
        </div>
        <div className="between">
          <button type='submit' className="btn btn__primary green">
            <p className="white">DEPOSIT</p>
          </button>
          <button type='submit' className="btn btn__primary">
            <p onClick={ e => {
            e.preventDefault();
            unstakeTokens()
          }} className="white">WITHDRAW</p>
          </button>
        </div>
        </form>
      </div>
    </>
  );
};

export default Main;
