#!/bin/sh
#init
cd ../../../
npm run env:restart
npm run cc:start -- supplychainchaincode  1

npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createSupplier '{"id":"SPL_2","name":"supplier2","rawMaterialAvailable":3000}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createManufacturer '{"id":"MNF_1","name":"manufacturer1","productsAvailable":0,"rawMaterialAvailable":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createManufacturer '{"id":"MNF_2","name":"manufacturer2","rawMaterialAvailable":0,"productsAvailable":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createDistributor '{"id":"DST_1","name":"distributor1","productsToBeShipped":0,"productsShipped":0,"productsReceived":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createDistributor '{"id":"DST_2","name":"distributor2","productsToBeShipped":0,"productsShipped":0,"productsReceived":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createRetailer '{"id":"RTL_1","name":"retailer1","productsOrdered":0,"productsAvailable":0,"productsSold":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createRetailer '{"id":"RTL_2","name":"retailer2","productsOrdered":0,"productsAvailable":0,"productsSold":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createCustomer '{"id":"CST_1","name":"luca","productsBought":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createCustomer '{"id":"CST_2","name":"diestrin","productsBought":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createCustomer '{"id":"CST_3","name":"waltermontes","productsBought":0}'
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode fetchRawMaterial SPL_1 1000 #so SPL_1 is 3000
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode fetchRawMaterial SPL_2 2000 #so SPL_2 is 5000
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode getRawMaterialFromSupplier MNF_1 SPL_1 500
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode getRawMaterialFromSupplier MNF_1 SPL_2 50
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode getRawMaterialFromSupplier MNF_2 SPL_1 200
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode getRawMaterialFromSupplier MNF_2 SPL_2 100 # alla fine ci aspettiamo SPL_1:2300, MNF_1 550, SPL_2:4850 MNF_2:300
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createProducts MNF_1 25 10
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createProducts MNF_2 10 50
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode sendProductsToDistribution MNF_1 DST_1 5
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode sendProductsToDistribution MNF_1 DST_2 3
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode sendProductsToDistribution MNF_2 DST_1 6 # DST_1: 11, DST_2: 3
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode orderProductsFromDistributor RTL_1 DST_1 5
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode orderProductsFromDistributor RTL_1 DST_2 1
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode orderProductsFromDistributor RTL_2 DST_2 2
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode receiveProductsFromDistributor RTL_1 DST_1 5
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode receiveProductsFromDistributor RTL_1 DST_2 1
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode receiveProductsFromDistributor RTL_2 DST_2 2
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode buyProductsFromRetailer RTL_1 CST_1 2
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode buyProductsFromRetailer RTL_2 CST_2 2
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode buyProductsFromRetailer RTL_1 CST_2 2

npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode getAllModels
#docker logs $(docker ps -qa | head -n 1) -f
