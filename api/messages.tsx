import { nacl } from "react-native-tweetnacl";

interface Message {
  message: {
    name: string;
    payload: object;
  };
}

export const message = (message: Message) => `${JSON.stringify(message)}\n`;

export const balanceMessage = (public_address: string) =>
  message({
    message: {
      name: "balance",
      payload: {
        public_address: public_address,
      },
    },
  });

export const txHistoryMessage = (public_address: string) =>
  message({
    message: {
      name: "tx_history",
      payload: {
        public_address: public_address,
      },
    },
  });

export const transactionMessage = (tx: object) =>
  message({
    message: {
      name: "transaction",
      payload: tx,
    },
  });

export const createTransaction = (
  privateSeed: string,
  publicKey: string,
  receiver: string,
  amount: number
) => {
  // Based on the python implementation here https://github.com/gunncoin/gunncoin/blob/main/gunncoin/transactions.py
  const txUnsigned = {
    amount: amount,
    receiver: receiver,
    sender: publicKey,
    timestamp: 1647737385,
  };

  // Reduce json to bytes
  const jsonToArray = (json: object) => {
    const str = JSON.stringify(json, Object.keys(json).sort(), 0);
    const ret = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) ret[i] = str.charCodeAt(i);
    return ret;
  };

  const txBytes = jsonToArray(txUnsigned);

  // Get secret key from seed
  const seed = Uint8Array.from(Buffer.from(privateSeed, "hex"));
  const { secretKey } = nacl.sign.keyPair.fromSeed(seed);

  // Attach signature
  const signature = nacl.sign.detached(txBytes, secretKey);

  const sigHex = Buffer.from(signature).toString("hex");
  const tx = { ...txUnsigned, signature: sigHex };

  return tx;
};
