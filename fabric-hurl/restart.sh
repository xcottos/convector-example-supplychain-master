
#!/bin/bash
set -e

#clean

ITEMS=$(docker ps -a | awk '$2~/hyperledger/ {print $1}') 

if [ ! -z "$ITEMS" ]; then
    docker stop $(docker ps -a | awk '$2~/hyperledger/ {print $1}') 
    docker rm -f $(docker ps -a | awk '$2~/hyperledger/ {print $1}') $(docker ps -a | awk '{ print $1,$2 }' | grep dev-peer | awk '{print $1 }') || true
    docker rmi -f $(docker images | grep dev-peer | awk '{print $3}') || true
fi

# start
COMPOSE_PROJECT_NAME=net FABRIC_VERSION=1.3.0 THIRDPARTY_VERSION=0.4.13 docker-compose -f /Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/docker-compose.yaml up -d

# init

#!/bin/bash
USERS=1

function createchannel() {
    
    echo "Creating ch1 channel block in peer $1"
    docker exec $1 peer channel create  -o orderer.hurley.lab:7050 -c ch1 -f /etc/hyperledger/configtx/ch1.tx

    docker exec $1 mv ch1.block /shared/
    
}

function joinchannel() {
    
    echo "Joining ch1 channel on peer ch1"
    docker exec $1 peer channel join -b /shared/ch1.block
    
}

function setanchor() {
    
    echo "Creating ch1 anchor block in peer $1"
    docker exec $1 peer channel update  -o orderer.hurley.lab:7050 -c ch1 -f /etc/hyperledger/configtx/$1.ch1.tx

    
}

function registeradmin() {
    node /Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/node_modules/@worldsibu/convector-tool-dev-env/dist/command.js add-admin admin adminpw $2        -k "/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/.hfc-$1"        -p "/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/network-profiles/$1.network-profile.yaml"
}

function registeruser() {
    node /Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/node_modules/@worldsibu/convector-tool-dev-env/dist/command.js add-user $1 admin $4        -a "org1"        -r client        -k "/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/.hfc-$2"        -p "/Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/fabric-hurl/network-profiles/$2.network-profile.yaml"
}

createchannel peer0.org1.hurley.lab

sleep 5

joinchannel peer0.org1.hurley.lab
joinchannel peer0.org2.hurley.lab

setanchor peer0.org1.hurley.lab
setanchor peer0.org2.hurley.lab


sleep 5


echo "Registering admin for org1"
registeradmin org1 org1MSP
wait

echo "Registering admin for org2"
registeradmin org2 org2MSP
wait






echo "Registering user1 for org1"
registeruser user1 org1 department1 org1MSP 
wait

echo "Registering user1 for org2"
registeruser user1 org2 department1 org2MSP 
wait



