import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";
const LootTemplateModule = buildModule("LendingLoot", (m) => {
  const owner = m.getAccount(0);

  const nftLending = m.contract("NFTLendingProtocol", [owner]);
  m.send("SendingEth", nftLending, 1_000_000n);

  const loot = m.contract("LootTemplate", [owner]);
  m.call(loot, "claim", [1], { id: "claim1" });
  m.call(loot, "claim", [2], { id: "claim2" });
  m.call(loot, "claim", [3], { id: "claim3" });
  m.call(loot, "claim", [4], { id: "claim4" });
  m.call(loot, "claim", [5], { id: "claim5" });
  m.call(loot, "claim", [6], { id: "claim6" });
  m.call(loot, "setApprovalForAll", [nftLending, true]);
  
  return { nftLending, loot };
});

export default LootTemplateModule;
