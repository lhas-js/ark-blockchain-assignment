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
  getDelegates = (page = 1) => {
    return axios.get(`${server}/delegates?page=${page}`);
  };
  getAllDelegates = async () => {
    const request = await this.getDelegates(1);

    let delegates = request.data.data;

    if (!request.data.meta.next) {
      return delegates;
    }

    let requests = [];

    for (let i = 2; i <= request.data.meta.pageCount; i++) {
      requests.push(this.getDelegates(i));
    }

    const responses = await Promise.all(requests);

    delegates = [
      ...delegates,
      ...responses
        .map((req: any) => req.data.data)
        .reduce((curr, prev) => {
          return [...curr, ...prev];
        }, [])
    ];

    return delegates;
  };
}

export default new ArkService();
