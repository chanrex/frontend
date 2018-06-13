import { endpoint, fstAddress, apiKey } from '../config/contractAddress.js';
const urlForFST = `http://api-kovan.etherscan.io/api?module=account&action=txlist&address=${fstAddress}&startblock=7584233&endblock=latest&sort=asc&apikey=${apiKey}`;

export function getAlltransaction() {
  return fetch(urlForFST, {
    mode: 'cors',
    method: 'GET',
  })
    .then(res => res.text())
    .then(body => {
      // let {result} = JSON.parse(body);
      return JSON.parse(body);
    });
}

export function transactionReceipt(txHash = '0x') {
  let transactionReceipt = `https://api-kovan.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${apiKey}`;
  console.log('holy shit: ', transactionReceipt);
  return fetch(transactionReceipt, {
    mode: 'cors',
    method: 'GET',
  })
    .then(res => res.text())
    .then(body => {
      return JSON.parse(body);
    });
}
