export async function isWalletActive(xmtp, address) {
  const is_active = xmtp.canMessage(address);

  return is_active;
}

export async function createConversation(xmtp, address) {
  if (await isWalletActive(xmtp, address)) {
    await xmtp.conversations.newConversation(address);
  }
}

export async function broadcastMessage(xmtp, broadcast_address_array, message) {
  const broadcast_address_can_message_array = await isWalletActive(
    xmtp,
    broadcast_address_array
  );
  for (let i = 0; i < broadcast_address_array.length; i++) {
    const to = broadcast_address_array[i];

    const canMessage = broadcast_address_can_message_array[i];
    if (canMessage) {
      const conversation = await xmtp.conversations.newConversation(to);

      const sent = await conversation.send(message);
    }
  }
}

export async function loadMessages(xmtp, address) {
  if (await isWalletActive(xmtp, address)) {
    const conversation = await xmtp.conversations.newConversation(address);

    const response = await conversation.messages();

    const messages = [];
    for (let i = 0; i < response.length; i++) {
      messages.push(response[i].content);
    }

    return messages;
  }
}

export async function streamMessages(xmtp, address) {
  if (await isWalletActive(xmtp, address)) {
    const conversation = await xmtp.conversations.newConversation(address);

    for await (const message of await xmtp.conversations.streamAllMessages()) {
      console.log(
        `New message from ${message.senderAddress}: ${message.content}`
      );
    }
  }
}
