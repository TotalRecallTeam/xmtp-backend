import dotenv from "dotenv";
import { Wallet } from "ethers";
import { Client } from "@xmtp/xmtp-js";
import { streamMessages } from "./xmtp_utils.js";

dotenv.config();

async function main() {
  const owner_address = process.env.WALLET_1_ADDRESS;
  const buyer_pk = process.env.WALLET_2_PRIVATE_KEY;

  const wallet = new Wallet(buyer_pk);

  const xmtp = await Client.create(wallet, { env: "dev" });

  await streamMessages(xmtp, owner_address);
}

main();
