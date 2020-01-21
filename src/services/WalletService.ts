import { Generator } from "more-entropy";
import { randomBytes } from "crypto";
import { walletFromEntropy } from "paper-wallet/src/crypto";

class WalletService {
  generate = (onSuccess: any) => {
    new Generator().generate(2048, (values: any) => {
      const entropy = values.concat(Array.from(randomBytes(256)));
      const wallet = walletFromEntropy(this.shuffle(entropy).slice(0, 16));

      onSuccess(wallet);
    });
  };

  shuffle = (items: number[]) => {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  };
}

export default new WalletService();
