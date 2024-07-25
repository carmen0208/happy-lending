"use client";

import { type ReactNode } from "react";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

export function WalletProvider(props: { children: ReactNode }) {
  return (
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "Happy Lending",
        },
        infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY,
      }}
    >
      {props.children}
    </MetaMaskUIProvider>
  );
}
