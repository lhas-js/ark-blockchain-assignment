import { Generator } from "more-entropy";
import { randomBytes } from "crypto";

class WalletService {
  generate = (onSuccess: any) => {
    console.log("ae");
    new Generator().generate(2048, (values: any) => {
      console.log("values", values);
      onSuccess();
      // this.entropy = values.concat(Array.from(randomBytes(256)));
      // this.generateWallet();
    });
  };
}

export default new WalletService();
