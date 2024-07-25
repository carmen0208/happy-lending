 
## POC: How to Building a Decentralized NFT Lending Platform with ConsenSys Products

This document provides instructions on how to build a proof-of-concept (POC) for a decentralized NFT lending platform using ConsenSys products.

### Local Setup
To set up the project locally, follow these steps:
#### Deploy Lending protocol to LineaSepolia networks

* Configure Environment Variables: Set up the necessary environment variables required for the project.

    ```shell
    INFURA_API_KEY # Infura API key. Obtain this key by signing up at https://www.infura.io/ and configuring your project.
    SEPOLIA_PRIVATE_KEY #Private key for deploying the smart contracts. Make sure this private key has some ETH in the Sepolia and LineaSepolia networks. You can obtain test ETH by visiting the https://www.infura.io/faucet/sepolia faucet.
    LINEASCAN_API_KEY #Lineascan API key. Configure this key by signing up at https://lineascan.build/.
    ```

    
    Once you have obtained these environment variables, you can configure them using the following commands:

    ```shell
    npx hardhat vars set INFURA_API_KEY
    npx hardhat vars set SEPOLIA_PRIVATE_KEY
    npx hardhat vars set LINEASCAN_API_KEY
    ```

* Deploy Smart Contracts: 
    Deploy the smart contracts to the Sepolia and LineaSepolia networks. This can be done using the deployment scripts provided.

    ```shell
    npm run deployToLineaSepolia
    ```

#### Run fronend locally

* Copy the contract information from the deployment to the frontend folder. This allows the frontend to interact with the deployed smart contracts.
    ```
    npm run cpLineaSepolia 
    ```
* Navigate to the frontend directory by running the following command:
    ```shell
    cd frontend
    ```
* Configure Frontend Environment Variables: 
    * Copy the `.env.example` file and rename it as `.env.local`. 
    * Open the `.env.local` file and fill in the `NEXT_PUBLIC_INFURA_API_KEY` variable with your Infura API key.

* Install Dependencies: 
    
    Run the following command to install the required dependencies:
    ```shell
    npm install
    ```

* Start the Frontend: 

    Finally,start the frontend application by running the command:
    ```shell
    npm run dev
    ```


By following these steps, you will have a local instance of the decentralized NFT lending platform running, allowing you to test and interact with the platform's features.

**Note**: It is important to refer to the specific documentation or guides provided by ConsenSys for more detailed instructions on setting up and deploying the smart contracts and configuring the frontend application.

