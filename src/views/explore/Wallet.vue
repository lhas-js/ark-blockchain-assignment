<template>
  <main class="flex flex-col h-screen text-gray-600">
    <Navbar />
    <div class="flex flex-1 p-3">
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
          class="flex justify-between px-6 py-6 my-6 bg-gray-700 text-white rounded-lg"
        >
          <div>
            <h3 class="text-gray-500 font-semibold text-sm">Address</h3>
            <p>{{ $route.params.wallet }}</p>
          </div>
          <div>
            <h3 class="text-gray-500 font-semibold text-sm">Balance</h3>
            <p>{{ this.balanceAsNumeral }}</p>
          </div>
        </section>

        <h2 class="text-gray-800 text-xl my-3 font-extrabold">
          Recent transactions
        </h2>

        <div class="bg-white rounded-lg shadow-md overflow-x-auto mb-2">
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="text-gray-400 font-semibold px-4 py-4">ID</th>
                <th class="text-gray-400 font-semibold px-4 py-4">Timestamp</th>
                <th class="text-gray-400 font-semibold px-4 py-4">Sender</th>
                <th class="text-gray-400 font-semibold px-4 py-4">Recipient</th>
                <th class="text-gray-400 font-semibold px-4 py-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">7e10b...692b4</td>
                <td class="border px-4 py-2">18/01/2020 09:37:18</td>
                <td class="border px-4 py-2">ALPyd...8Rtma</td>
                <td class="border px-4 py-2">AXuEq...FQMFZ</td>
                <td class="border px-4 py-2">0,97622275 Ѧ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import Back from "@/components/icons/Back.vue";
import WalletService from "@/services/WalletService";
import { IWallet } from "@/interfaces";
import { isWalletAddress, isPublicKey, readableCrypto } from "@/utils";
import { getAddress } from "@/services/CryptoService";

export default Vue.extend({
  components: { Navbar, Back },
  data: () => ({
    transactions: [],
    balance: "113458474518"
  }),
  computed: {
    balanceAsNumeral: function() {
      return readableCrypto(this.balance);
    }
  },
  methods: {}
});
</script>
