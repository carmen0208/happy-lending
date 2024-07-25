"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { useSDK } from "@metamask/sdk-react-ui";
import { providers, Contract, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import smartcontractAddress from "../contracts/deployed_addresses.json";
import lootArtifacts from "../contracts/artifacts/LendingLoot#LootTemplate.json";
import lendArtifacts from "../contracts/artifacts/LendingLoot#NFTLendingProtocol.json";
import { Buffer } from "buffer";
import { Button } from "./ui/button";

export function Assets({}) {
  const lootAddress = smartcontractAddress["LendingLoot#LootTemplate"];
  const lendingAddress = smartcontractAddress["LendingLoot#NFTLendingProtocol"]
  const { connected, provider } = useSDK();
  const [lendingContract, setLendingContract] = useState<Contract| undefined>();
  const [web3Provider, setWeb3Provider] = useState<
    providers.Web3Provider | undefined
  >();
  const [nfts, setNfts] = useState<{image:string, tokenId: number}[]>([]);
  useEffect(() => {
    (async () => {
      if (!connected || !provider) {
        return;
      }
      console.log("provider" , provider)
      const _web3Provider = new providers.Web3Provider(
        provider as unknown as providers.ExternalProvider
      );
      console.log("_web3Provider" , _web3Provider)

      setWeb3Provider(_web3Provider);
      const lootContract = new Contract(
        lootAddress,
        lootArtifacts.abi,
        _web3Provider
      );

      const lendingContract = new Contract(lendingAddress, lendArtifacts.abi, _web3Provider.getSigner())
      console.log("lendingContract" , lendingContract)

      setLendingContract(lendingContract)
      const tokenIds = [1, 2, 3, 4, 5];
      const svgs = await Promise.all(
        tokenIds.map(async (tokenId) => {
          const token = await lootContract.tokenURI(tokenId);
          const encoded = token.split(",")[1];
          const decode = Buffer.from(encoded, "base64").toString("binary");
          return {
            tokenId,
            image: JSON.parse(decode).image
          }
        })
      );
      setNfts(svgs);
    })();
  }, [provider, connected, lootAddress, lendingAddress]);

  const lendNft = useCallback(async (tokenId: number) => {
    if(!lendingContract) {
      return;
    }
    const loanAmount = utils.parseEther("0.0000000000001")
    const interestRate = 5 // 5% interest rate
    const duration = 36000; // Loan duration in seconds (10 hour)

    const transaction = await lendingContract.createLoan(tokenId, lootAddress, loanAmount, interestRate, duration, {
      gasLimit: 5000000
    })
    const receipt = await transaction.wait();
    console.log('Loan created successfully:', receipt);
  }, [lendingContract, lootAddress])

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>You Assets</CardTitle>
          <CardDescription>Pick your asset to lend.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {nfts.map((nfts) => (
              <div key={nfts.tokenId} className="flex flex-col gap-2">
                <Image
                  src={nfts.image}
                  alt="NFT"
                  width="200"
                  height="400"
                />
                <Button className="max-w-200" variant="outline" onClick={()=> lendNft(nfts.tokenId)}>Create Loan</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
