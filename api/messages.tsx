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

export const transactionMessage = (tx: object) =>
  message({
    message: {
      name: "transaction",
      payload: tx,
    },
  });

export const createTransaction = (
  privateKey: string,
  publicKey: string,
  receiver: string,
  amount: number
) => {
  // Based on the python implementation here https://github.com/gunncoin/gunncoin/blob/main/gunncoin/transactions.py
  const tx = {
    sender: publicKey,
    receiver: receiver,
    amount: amount,
    timestamp: Date.now(),
  };

  const txBytes = JSON.stringify(tx);
  console.log(txBytes);
};

/*

def create_transaction(
    private_key: str, public_key: str, receiver: str, amount: int
) -> dict:
    """
    Creates a transaction from a sender's public key to a receiver's public key

    :param private_key: The Sender's private key
    :param public_key: The Sender's public key
    :param receiver: The Receiver's public key
    :param amount: The amount in cents
    :return: <dict> The transaction dict
    """

    tx = {
        "sender": public_key,
        "receiver": receiver,
        "amount": amount,
        "timestamp": int(time()),
    }
    tx_bytes = json.dumps(tx, sort_keys=True).encode("ascii")

    # Generate a signing key from the private key
    signing_key = SigningKey(private_key, encoder=HexEncoder)

    # Now add the signature to the original transaction
    signature = signing_key.sign(tx_bytes).signature
    tx["signature"] = HexEncoder.encode(signature).decode("ascii")

    return tx

*/
