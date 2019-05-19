exports.ZKSensors = {
  sensorReport:         {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      },
      {
        "name": "_tc1",
        "type": "uint256"
      },
      {
        "name": "_tc2",
        "type": "uint256"
      },
      {
        "name": "_oc1",
        "type": "uint256"
      },
      {
        "name": "_oc2",
        "type": "uint256"
      },
      {
        "name": "_ec1",
        "type": "uint256"
      },
      {
        "name": "_ec2",
        "type": "uint256"
      }
    ],
    "name": "sensorReport",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
};