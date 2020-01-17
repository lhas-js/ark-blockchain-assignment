<template>
  <main class="flex flex-col h-screen text-gray-600">
    <Navbar />
    <div class="flex items-center flex-1 text-center">
      <div v-if="isLoading" class="container mx-auto">
        <h2 class="text-gray-800 text-4xl font-extrabold">Generating wallet</h2>
        <Loader />
      </div>
      <div v-else class="container mx-auto">
        <h2 class="text-gray-800 text-3xl mt-4 mb-4 font-extrabold">Wallet generated 👏</h2>
        <div
          class="text-left max-w-4xl mx-auto mb-4 p-6 bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <h2 class="text-gray-800 text-xl font-semibold">Address</h2>
          <input class="text-field mt-2 w-full" disabled :value="metadata.address" />
          <h2 class="text-gray-800 text-xl mt-3 mb-2 font-semibold">Passphrase</h2>

          <div class="flex flex-wrap -mx-2">
            <div
              class="w-1/4 px-2 mb-3"
              :key="passphrase"
              v-for="passphrase in metadata.passphrase.split(' ')"
            >
              <input class="text-field w-full" disabled :value="passphrase" />
            </div>
          </div>

          <h2 class="text-gray-800 text-sm font-semibold mt-2">Entropy</h2>
          <p class="text-sm">{{ this.metadata.entropy }}</p>
          <hr class="mt-2 mb-2" />
          <h2 class="text-gray-800 text-sm font-semibold mt-2">Public Key</h2>
          <p class="text-sm">{{ this.metadata.publicKey }}</p>
          <hr class="mt-2 mb-2" />
          <h2 class="text-gray-800 text-sm font-semibold mt-2">WIF</h2>
          <p class="text-sm">{{ this.metadata.wif }}</p>
        </div>
        <router-link class="text-gray-500 mt-4 rounded inline-block p-2 mb-6" to="/">Back to Home</router-link>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "../components/Navbar.vue";
import Loader from "../components/Loader.vue";
import WalletService from "../services/WalletService";
import { IWallet } from "@/interfaces";

export default Vue.extend({
  components: { Navbar, Loader },
  mounted() {
    const onSuccess = (wallet: IWallet) => {
      this.isLoading = false;
      this.metadata = wallet;
    };

    WalletService.generate(onSuccess);
  },
  data: () => ({
    isLoading: true,
    metadata: {
      address: "AQXtnzu3HBBhGhCgnKzTTTgoVfJpgrcuK3",
      passphrase:
        "scorpion mouse rude habit lady blur baby lend robot ask lucky gold",
      entropy: "4eb03dc682efe1f0cd26e774d89d615e",
      publicKey:
        "02d302117e1fb88fa5b187969c8612d1e87ec2d409a330685f39ee46f18e5a16ef",
      wif: "SD5JC9c6riBewYgQWMvAceyTd9P1hxgJZfVemtt4xcRQycPjrWBa"
    }
  })
});
</script>
