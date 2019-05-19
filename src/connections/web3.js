const Web3 = require("web3");
const Tx = require('ethereumjs-tx');

const { GeneralError } = require('@feathersjs/errors');

const abi = require('../contracts/abi');
const ZKSensors = require('../contracts/ZkSensors');
class Web3Service {

  constructor (app) {
    const nodeHTTPURL = 'https://rinkeby.infura.io/v3/23c90bc7c48546a0b4f9810fdafae93f';
    const HTTPProvider = new Web3.providers.HttpProvider(nodeHTTPURL);
    this.web3 =  new Web3(HTTPProvider);
    this.account = {
      address: "0x304057AdBf64cA8d343664E47Ef0E93791621164",
      privateKey: "0x4fcb85cbaaf9e9026cab9fbde8b0f6571628f3d8b59be57c5c76177a27428617"
    };
    this.nonce = 12;
  }


  async sendData(params, nonce){

    return new Promise(async (resolve, reject) => {

      try{

        console.log("SEND DATA");

        const data = this.web3.eth.abi.encodeFunctionCall(abi.ZKSensors.sensorReport, params);

        console.log(data);

        const nonce = this.nonce;

        this.nonce += 1;

        const rawTx = {
          "from": this.account.address,
          "to": ZKSensors.contract.address,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('600000000'),
          "gas": this.web3.utils.toHex('3000000'),
          "data": data,
          "nonce": nonce,
        };

        console.log(rawTx);

        const privateKey = Buffer.from(this.account.privateKey.slice(2), 'hex');

        const tx = new Tx(rawTx);

        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        const receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        console.log(receipt);

        resolve()

      } catch(e){
        reject(e)
      }

    })
  }

  async createNewAccount(){
    return new Promise(async (resolve, reject) => {
      try {
        const wallet = await this.web3.eth.accounts.wallet.create(1);
        // console.log(wallet.accounts[0]);
        //this.account = wallet.accounts[0];
        //console.log('web3 account created');
        console.log(this.account);
        resolve();
      } catch (e) {
        reject(e)
      }
    });
  }

  async getNonce(){
    return new Promise(async (resolve, reject) => {
      try {
        this.nonce = await this.web3.eth.getTransactionCount(this.account.address);
        console.log("GOT NONCE: " + this.nonce);
        resolve();
      } catch (e) {
        reject(e)
      }
    });
  }


}

module.exports = function () {
  return function(){

    const app = this;
    const web3 = new Web3Service(app);
    console.log('web3 connection acquired');

    // web3.createNewAccount();
    web3.getNonce();

    app.set('web3Service', web3);

  };
};

module.exports.Web3Service = Web3Service;
