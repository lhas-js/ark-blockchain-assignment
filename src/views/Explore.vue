<template>
  <main class="flex flex-col h-screen text-gray-600">
    <Navbar />
    <div class="flex items-center flex-1 text-center">
      <div class="container mx-auto">
        <h2 class="text-gray-800 text-2xl mb-2 font-extrabold">Explore a wallet</h2>
        <form
          v-on:submit.prevent="onSubmit"
          class="flex text-center max-w-xl mx-auto mb-4 p-6 bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <input
            v-model="searchTerm"
            class="text-field w-full"
            placeholder="Wallet address or public key"
          />
          <button class="ml-2 border border-gray-200 p-2 rounded">OK</button>
        </form>
        <router-link
          class="text-gray-500 hover:text-gray-600 text-sm underline inline-block p-2 mb-6"
          to="/explore/delegates"
        >Delegate Monitor</router-link>
        <span>|</span>
        <router-link
          class="text-gray-500 hover:text-gray-600 text-sm underline mt-4 rounded inline-block p-2 mb-6"
          to="/"
        >Back to Home</router-link>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navbar from "@/components/Navbar.vue";
import WalletService from "@/services/WalletService";
import { IWallet } from "@/interfaces";
import { isWalletAddress, isPublicKey } from "@/utils";
import { getAddress } from "@/services/CryptoService";

const ExploreProps = Vue.extend();

@Component({
  components: { Navbar }
})
export default class Explore extends ExploreProps {
  searchTerm: string = "";

  onSubmit() {
    const searchTerm = this.searchTerm.trim();
    const isValid =
      searchTerm.length > 0 &&
      (isWalletAddress(searchTerm) || isPublicKey(searchTerm));

    if (!isValid) {
      return;
    }

    const wallet = isPublicKey(searchTerm)
      ? getAddress(searchTerm)
      : searchTerm;

    this.$router.push({ name: "exploreWallet", params: { wallet } });
  }
}
</script>
