import dotenv from "dotenv";
import { Wallet } from "ethers";
import { Client } from "@xmtp/xmtp-js";
import { createConversation, broadcastMessage } from "./xmtp_utils.js";

dotenv.config();

async function main() {
  const owner_pk = process.env.WALLET_1_PRIVATE_KEY;
  const buyer_address = process.env.WALLET_2_ADDRESS;

  const wallet = new Wallet(owner_pk);

  const xmtp = await Client.create(wallet, { env: "dev" });

  await createConversation(xmtp, buyer_address);

  await broadcastMessage(
    xmtp,
    [
      buyer_address,
      buyer_address,
      buyer_address,
      buyer_address,
      buyer_address,
      buyer_address,
    ],
    "Hello"
  );
}

main();
