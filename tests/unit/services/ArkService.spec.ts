import axios from "axios";
import ArkService from "@/services/ArkService";

jest.mock("axios");

describe("ArkService", () => {
  describe(".getWallet()", () => {
    const wallet = "AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9Nj";
    const response = {
      data: {
        address: "AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9Nj"
      }
    };

    it("should fetch sucessfully the wallet data", () => {
      jest
        .spyOn(axios, "get")
        .mockImplementationOnce(() => Promise.resolve(response));
      const wrapper = ArkService.getWallet(wallet);
      expect(wrapper).resolves.toEqual(response);
    });

    it("should fetch erroneously the wallet data", () => {
      const errorMessage = "Network Error";
      jest
        .spyOn(axios, "get")
        .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      const wrapper = ArkService.getWallet(wallet);
      expect(wrapper).rejects.toThrow(errorMessage);
    });
  });
  describe(".getTransactions()", () => {
    const wallet = "AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9Nj";
    const response = {
      data: []
    };

    it("should fetch sucessfully the transactions data", () => {
      jest
        .spyOn(axios, "get")
        .mockImplementationOnce(() => Promise.resolve(response));
      const wrapper = ArkService.getTransactions(wallet);
      expect(wrapper).resolves.toEqual(response);
    });

    it("should fetch erroneously the wallet data", () => {
      const errorMessage = "Network Error";
      jest
        .spyOn(axios, "get")
        .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      const wrapper = ArkService.getTransactions(wallet);
      expect(wrapper).rejects.toThrow(errorMessage);
    });
  });
  describe(".getDelegates()", () => {
    const response = {
      data: []
    };

    it("should fetch sucessfully the delegates data", () => {
      jest
        .spyOn(axios, "get")
        .mockImplementationOnce(() => Promise.resolve(response));
      const wrapper = ArkService.getDelegates();
      expect(wrapper).resolves.toEqual(response);
    });

    it("should fetch erroneously the wallet data", () => {
      const errorMessage = "Network Error";
      jest
        .spyOn(axios, "get")
        .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      const wrapper = ArkService.getDelegates();
      expect(wrapper).rejects.toThrow(errorMessage);
    });
  });
  describe(".getAllDelegates()", () => {
    const response = {
      data: {
        data: [],
        meta: {
          next: null
        }
      }
    };

    it("should fetch sucessfully the delegates data when only have one page", () => {
      jest
        .spyOn(axios, "get")
        .mockImplementationOnce(() => Promise.resolve(response));
      const wrapper = ArkService.getAllDelegates();
      expect(wrapper).resolves.toEqual([]);
    });
  });

  it("should fetch sucessfully the delegates data when have multiple pages", () => {
    const response = {
      data: {
        data: [],
        meta: {
          next: "https://explorer.ark.io/api/",
          pageCount: 2
        }
      }
    };
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(response));
    const wrapper = ArkService.getAllDelegates();
    expect(wrapper).resolves.toEqual([]);
  });
});
