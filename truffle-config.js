
module.exports = {
  networks: {
    docker: {
      host: "ganache",
      port: 8545,
      network_id: "*",
      gas: 5500000
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};