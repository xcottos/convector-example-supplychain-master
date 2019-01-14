
#!/bin/bash
set -e



export FABRIC_CFG_PATH=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/fabric-binaries/1.3.0/config


echo "Installing Chaincode at org1"

export CORE_PEER_MSPCONFIGPATH=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp
export CORE_PEER_ID=peer0.org1.hurley.lab
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_LOCALMSPID=org1MSP
export CORE_PEER_TLS_ROOTCERT_FILE=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/msp/tlscacerts/tlsca.org1.hurley.lab-cert.pem


/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/fabric-binaries/1.3.0/bin/peer chaincode install -n supplychainchaincode -v 1.0 -p "/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/chaincode-supplychainchaincode" -l "node"


echo "Installed Chaincode at org1"

echo "Installing Chaincode at org2"

export CORE_PEER_MSPCONFIGPATH=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/artifacts/crypto-config/peerOrganizations/org2.hurley.lab/users/Admin@org2.hurley.lab/msp
export CORE_PEER_ID=peer0.org2.hurley.lab
export CORE_PEER_ADDRESS=localhost:7151
export CORE_PEER_LOCALMSPID=org2MSP
export CORE_PEER_TLS_ROOTCERT_FILE=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/artifacts/crypto-config/peerOrganizations/org2.hurley.lab/msp/tlscacerts/tlsca.org2.hurley.lab-cert.pem


/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/fabric-binaries/1.3.0/bin/peer chaincode install -n supplychainchaincode -v 1.0 -p "/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/chaincode-supplychainchaincode" -l "node"


echo "Installed Chaincode at org2"


sleep 10

echo "Upgrading Chaincode at org1"

echo "It may take a few minutes depending on the chaincode dependencies"
export CORE_PEER_MSPCONFIGPATH=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp
export CORE_PEER_ID=peer0.org1.hurley.lab
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_LOCALMSPID=org1MSP
export CORE_PEER_TLS_ROOTCERT_FILE=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/msp/tlscacerts/tlsca.org1.hurley.lab-cert.pem

/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/fabric-binaries/1.3.0/bin/peer chaincode upgrade    -C ch1    -n supplychainchaincode    -v 1.0    -c '{"Args":["init",""]}'    -o localhost:7050    --cafile /Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/artifacts/crypto-config/ordererOrganizations/hurley.lab/orderers/orderer.hurley.lab/msp/tlscacerts/tlsca.hurley.lab-cert.pem

    # -P "OR('org1.client','org2.client')"
echo "Upgraded Chaincode at org1"

# touch /Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/tasks/upgradechaincode.sh.successful
  