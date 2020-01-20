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

        <Loader v-if="this.isLoading" />

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

        <button
          v-if="this.hasLoadMore"
          v-on:click="loadMore"
          class="mx-auto block my-4 p-3 text-gray-500 hover:text-gray-600 border rounded border-gray-500 hover:border-gray-600"
        >
          Load More
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Loader from "@/components/Loader.vue";
import Navbar from "@/components/Navbar.vue";
import Back from "@/components/icons/Back.vue";
import WalletService from "@/services/WalletService";
import { IWallet, IDelegate } from "@/interfaces";
import { isWalletAddress, isPublicKey, readableCrypto } from "@/utils";
import { getAddress } from "@/services/CryptoService";
import ArkService from "../../services/ArkService";

export default Vue.extend({
  components: { Navbar, Back, Loader },
  data: () => ({
    page: 1,
    isLoading: true,
    delegates: [] as IDelegate[],
    pagination: {
      page: 1,
      total: 1
    }
  }),
  mounted: async function() {
    const request = await ArkService.getDelegates(1);

    this.delegates = request.data.data;
    this.pagination.total = request.data.meta.pageCount;
    this.isLoading = false;
  },
  methods: {
    loadMore: async function() {
      this.isLoading = true;

      const el = document.querySelector("#page");
      const request = await ArkService.getDelegates(this.pagination.page + 1);

      this.delegates = [...this.delegates, ...request.data.data];
      this.pagination.total = request.data.meta.pageCount;
      this.isLoading = false;

      if (!el) {
        return;
      }

      setTimeout(() => {
        el.scrollIntoView(false);
      });
    }
  },
  computed: {
    formattedDelegates() {
      const response = this.delegates.map(delegate => ({
        ...delegate,
        humanizedVotes: readableCrypto(delegate.votes)
      }));
      return response;
    },
    hasLoadMore() {
      return !this.isLoading && this.pagination.page < this.pagination.total;
    }
  }
});
</script>
