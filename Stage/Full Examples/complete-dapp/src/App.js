import React, {useState} from 'react';
import './App.css';
import Lock from './artifacts/contracts/Lock.sol/Lock.json';

const lockAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ethers = require('ethers');

function App() {
  
  const [lock, lockValue] = useState('')

  async function fetchLock() {
    if(typeof window.etherem !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(lockAddress, Lock.abi, provider);
      try{
        const data = await contract.lock();
        console.log('data: ', data);
        lockValue(data.toString());
      }
      catch(err){
        console.log("Error: ", err)
      }
    }
  }

  async function setLock(value){
    if(!value) return;
  
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount(); // Chiamata a requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lockAddress, Lock.abi, signer);
      const transaction = await contract.setLock(value);
      await transaction.wait();
      fetchLock();
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    await setLock(event.target.lockInput.value)
    setLock(event.target.lockInput.value)
    event.target.lockInput.value = '';
  }

  async function requestAccount(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  return (
    <div className="w-full max-m-lg-container">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="text-gray-600 font-bold text-lg mb-2">
          React Ethereum Dapp
        </div>
      </div>
      <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
        <div className="text-gray-600 font-bold text-lg mb-2">
          Fetch Lock Message from Smart Contract
        </div>
        <div className="flex">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchLock}>Fetch Lock</button>
        </div>
      </div>
      <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
        <div className="text-gray-600 font-bold text-lg mb-2">
          Set Lock Message on Smart Contract
        </div>
        <form 
          className="flex items-center justify-between"
          onSubmit={event => handleSubmit(event)}
          >
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="lockInput"
            />
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Set Lock</button>
          </form>
      </div>
      <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
        <div className="text-gray-600 font-bold text-lg mb-2">
          Lock Message
        </div>
        <div>
          <p>{lock}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
