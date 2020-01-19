import axios from "axios";
const server = "https://explorer.ark.io/api";

class ArkService {
  getWallet = (wallet: string) => {
    return axios.get(`${server}/wallets/${wallet}`);
  };
  getTransactions = (wallet: string, page = 1) => {
    return axios.get(
      `${server}/wallets/${wallet}/transactions?orderBy=timestamp:desc&page=${page}&limit=25`
    );
  };
}

export default new ArkService();
