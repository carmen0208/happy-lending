import { getDefaultConfig } from "connectkit";
import { createConfig,configureChains } from "wagmi";
import { mainnet, optimism, arbitrum } from "wagmi/chains";

const { chains, publicClient } = configureChains(
  [mainnet, optimism, arbitrum],
  [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)

export const config = createConfig(
  getDefaultConfig({
    appName: "Ninja Hub",
    chains: [mainnet, optimism, arbitrum],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!
  })
);

// declare module "wagmi" {
//   interface Register {
//     config: typeof config;
//   }
// }
