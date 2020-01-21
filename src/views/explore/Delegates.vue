<template>
  <main class="flex flex-col h-screen text-gray-600">
    <Navbar />
    <div id="page" class="flex flex-1">
      <div class="container mx-auto">
        <h2 class="text-gray-800 text-2xl my-2 font-extrabold">
          <router-link
            class="text-gray-500 rounded mr-2 inline-block"
            to="/explore"
          >
            <Back /> </router-link
          >Delegate Monitor
        </h2>

        <div
          class="text-gray-500 text-md bg-white rounded-lg shadow-md overflow-x-auto md:overflow-hidden my-3"
        >
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="text-gray-400 font-semibold px-4 py-4">Rank</th>
                <th class="text-gray-400 font-semibold px-4 py-4">Username</th>
                <th class="text-gray-400 font-semibold px-4 py-4">Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-bind:key="delegate.id"
                v-for="(delegate, index) in formattedDelegates"
              >
                <td class="border px-4 py-2">{{ index + 1 }}</td>
                <td class="border px-4 py-2">{{ delegate.username }}</td>
                <td class="border px-4 py-2">{{ delegate.humanizedVotes }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Loader v-if="this.isLoading" />

        <LoadMoreButton v-if="this.hasLoadMore" :onClick="loadMore" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Loader from "@/components/Loader.vue";
import Navbar from "@/components/Navbar.vue";
import Back from "@/components/icons/Back.vue";
import { LoadMoreButton } from "@/components/buttons";
import WalletService from "@/services/WalletService";
import { IWallet, IDelegate } from "@/interfaces";
import { isWalletAddress, isPublicKey, readableCrypto } from "@/utils";
import { getAddress } from "@/services/CryptoService";
import ArkService from "@/services/ArkService";
import Component from "vue-class-component";

const DelegatesProps = Vue.extend();

@Component({
  components: { Navbar, Back, Loader, LoadMoreButton }
})
export default class Delegates extends DelegatesProps {
  isLoading = true;
  delegates: IDelegate[] = [];
  pagination = {
    page: 1,
    total: 1
  };

  async mounted() {
    const request = await ArkService.getDelegates(1);

    this.delegates = request.data.data;
    this.pagination.total = request.data.meta.pageCount;
    this.isLoading = false;
  }

  async loadMore() {
    this.isLoading = true;

    const el = document.querySelector("#page");
    const nextPage = this.pagination.page + 1;
    const request = await ArkService.getDelegates(nextPage);

    this.delegates = [...this.delegates, ...request.data.data];
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

  get formattedDelegates() {
    const response = this.delegates.map(delegate => ({
      ...delegate,
      humanizedVotes: readableCrypto(delegate.votes)
    }));
    return response;
  }

  get hasLoadMore() {
    return !this.isLoading && this.pagination.page < this.pagination.total;
  }
}
</script>
