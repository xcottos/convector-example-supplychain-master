
  #!/bin/bash
  set -e
  ROOT_DIR=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/node_modules/@worldsibu/hurley
  NETWORK_ROOT=/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl
  BIN=$NETWORK_ROOT/fabric-binaries/1.3.0/bin
  TARGET=$NETWORK_ROOT/artifacts
  
  export FABRIC_CFG_PATH=$NETWORK_ROOT
  
  function fail () {
    if [ "$?" -ne 0 ]; then
      echo $1
      exit 1
    fi
  }
  
  # remove previous crypto material and config transactions
  rm -fr $TARGET/config/*
  rm -fr $TARGET/crypto-config/*
  
  mkdir -p $TARGET/config/
  mkdir -p $TARGET/crypto-config/
  
  # generate crypto material
  $BIN/cryptogen generate --config=$NETWORK_ROOT/crypto-config.yaml --output=$TARGET/crypto-config
  fail "Failed to generate crypto material..."
  
  # generate genesis block for orderer
  $BIN/configtxgen -profile OrgsOrdererGenesis -outputBlock $TARGET/config/genesis.block
  fail "Failed to generate orderer genesis block..."
  
  for CH in ch1 
  do
    # generate channel configuration transaction
    $BIN/configtxgen -profile OrgsChannel -outputCreateChannelTx $TARGET/config/$CH.tx -channelID $CH
    fail "Failed to generate $CH configuration transaction..."
  
    
    $BIN/configtxgen -profile OrgsChannel -outputAnchorPeersUpdate $TARGET/config/peer0.org1.hurley.lab.$CH.tx -channelID $CH -asOrg org1MSP
    fail "Failed to generate $CH anchor peer update for org1..."
    
    
    $BIN/configtxgen -profile OrgsChannel -outputAnchorPeersUpdate $TARGET/config/peer0.org2.hurley.lab.$CH.tx -channelID $CH -asOrg org2MSP
    fail "Failed to generate $CH anchor peer update for org2..."
    
    

  done
  
  touch /Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/cyptofilesgenerator.sh.successful
  