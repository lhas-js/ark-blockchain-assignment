export interface IWallet {
  passphrase: string;
  address: string;
  publicKey: string;
  wif: string;
  entropy: string;
}

export interface ITokenNetwork {
  addressPrefix: number;
  wif: number;
}

export interface IToken {
  name: string;
  networks: Record<string, ITokenNetwork>;
}

export interface ITransaction {
  amount: string;
  blockId: string;
  confirmations: number;
  fee: string;
  id: string;
  recipient: string;
  sender: string;
  senderPublicKey: string;
  signature: string;
  timestamp: {
    epoch: number;
    unix: number;
    human: string;
  };
  type: number;
  version: number;
}

export interface IDelegate {
  address: string;
  blocks: {
    last: any;
    produced: number;
  };
  forged: {
    fees: string;
    rewards: string;
    total: string;
  };
  production: {
    approval: number;
  };
  publicKey: string;
  rank: number;
  username: string;
  votes: string;
}
