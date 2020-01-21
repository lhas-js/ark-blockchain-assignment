<template>
  <main class="flex flex-col h-screen text-gray-600">
    <Navbar />
    <div id="page" class="flex flex-1 p-3">
      <div class="container mx-auto">
        <h2
          class="text-gray-800 text-3xl my-3 font-extrabold flex items-center"
        >
          <router-link
            class="text-gray-500 rounded mr-2 inline-block"
            to="/explore"
          >
            <Back /> </router-link
          >Wallet Summary
        </h2>

        <section
          class="flex justify-between flex-col md:flex-row overflow-x-auto px-6 py-3 my-6 bg-gray-700 text-white rounded-lg"
        >
          <div class="my-3">
            <h3 class="text-gray-500 font-semibold text-sm">Address</h3>
            <p>{{ $route.params.wallet }}</p>
          </div>
          <div v-if="delegate" class="my-3">
            <h3 class="text-gray-500 font-semibold text-sm">Voting for</h3>
            <p>{{ this.delegate.username }}</p>
          </div>
          <div class="my-3">
            <h3 class="text-gray-500 font-semibold text-sm">Balance</h3>
            <p>{{ this.readableBalance }}</p>
          </div>
        </section>

        <div>
          <h2 class="text-gray-800 text-xl my-3 font-extrabold">
            All transactions
          </h2>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>
                    Timestamp
                  </th>
                  <th>Sender</th>
                  <th>
                    Recipient
                  </th>
                  <th>Amount</th>
                  <th>Fee</th>
                  <th>
                    Confirmations
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-bind:key="transaction.id"
                  v-for="transaction in formattedTransactions"
                >
                  <td>
                    <a
                      :href="
                        `https://explorer.ark.io/transaction/${transaction.id}`
                      "
                      :title="transaction.id"
                      target="_blank"
                      >{{ transaction.humanizedId }}</a
                    >
                  </td>
                  <td>
                    <timeago
                      :title="transaction.timestamp.human"
                      :datetime="transaction.humanizedTimestamp"
                    ></timeago>
                  </td>
                  <td :title="transaction.sender">
                    <a
                      :href="
                        `https://explorer.ark.io/wallets/${transaction.sender}`
                      "
                      :title="transaction.sender"
                      target="_blank"
                      >{{ transaction.humanizedSender }}</a
                    >
                  </td>
                  <td :title="transaction.recipient">
                    <a
                      :href="
                        `https://explorer.ark.io/wallets/${transaction.recipient}`
                      "
                      :title="transaction.recipient"
                      target="_blank"
                      >{{ transaction.humanizedRecipient }}</a
                    >
                  </td>
                  <td>{{ transaction.amount }}</td>
                  <td>{{ transaction.fee }}</td>
                  <td>
                    {{ transaction.confirmations }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Loader v-if="this.isLoading" />
          <LoadMoreButton v-if="this.hasLoadMore" :onClick="loadMore" />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import Back from "@/components/icons/Back.vue";
import Loader from "@/components/Loader.vue";
import { LoadMoreButton } from "@/components/buttons";
import WalletService from "@/services/WalletService";
import { IWallet, ITransaction, IDelegate } from "@/interfaces";
import {
  isWalletAddress,
  isPublicKey,
  readableCrypto,
  WELL_CONFIRMED_TRANSACTION,
  humanize
} from "@/utils";
import { getAddress } from "@/services/CryptoService";
import ArkService from "@/services/ArkService";
import _ from "lodash";
import Component from "vue-class-component";

const WalletProps = Vue.extend();

@Component({
  components: { Navbar, Back, Loader, LoadMoreButton }
})
export default class Wallet extends WalletProps {
  isLoading = true;

  transactions: ITransaction[] = [];

  delegates: IDelegate[] = [];

  wallet = {
    balance: "0",
    isDelegate: false,
    vote: ""
  };

  pagination = {
    page: 1,
    total: 1
  };

  async mounted() {
    const walletId = this.$route.params.wallet;

    const [wallet, transactions] = await Promise.all([
      ArkService.getWallet(walletId),
      ArkService.getTransactions(walletId)
    ]);

    this.delegates = await ArkService.getAllDelegates();
    this.wallet = wallet.data.data;
    this.transactions = transactions.data.data;
    this.pagination.total = transactions.data.meta.pageCount;
    this.isLoading = false;
  }

  async loadMore() {
    this.isLoading = true;

    const el = document.querySelector("#page");
    const walletId = this.$route.params.wallet;
    const nextPage = this.pagination.page + 1;
    const request = await ArkService.getTransactions(walletId, nextPage);

    this.transactions = [...this.transactions, ...request.data.data];
    this.pagination = {
      page: nextPage,
      total: request.data.meta.pageCount
    };
    this.isLoading = false;

    if (!el) {
      return;
    }

    setTimeout(() => {
      el.scrollIntoView(false);
    });
  }

  get readableBalance() {
    return readableCrypto(this.wallet.balance);
  }

  get delegate() {
    const vote = _.get(this.wallet, "vote", "");
    const wallet = getAddress(vote);
    return this.delegates.find(v => v.address === wallet);
  }

  get formattedTransactions() {
    const response = this.transactions.map(transaction => ({
      ...transaction,
      humanizedTimestamp: new Date(transaction.timestamp.unix * 1000),
      humanizedId: humanize(transaction.id),
      humanizedSender: humanize(transaction.sender),
      humanizedRecipient: humanize(transaction.recipient),
      amount: readableCrypto(transaction.amount),
      fee: readableCrypto(transaction.fee),
      confirmations:
        transaction.confirmations > WELL_CONFIRMED_TRANSACTION
          ? "Well confirmed"
          : transaction.confirmations
    }));
    return response;
  }

  get hasLoadMore() {
    return !this.isLoading && this.pagination.page < this.pagination.total;
  }
}
</script>
