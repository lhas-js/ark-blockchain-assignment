<template>
  <main class="flex flex-col h-screen">
    <Navbar />
    <div class="flex items-center flex-1 text-center">
      <div v-if="isLoading" class="container mx-auto">
        <h2 class="text-gray-800 text-4xl font-extrabold">Generating wallet</h2>
        <Loader />
      </div>
      <div v-else class="container mx-auto">
        <h2 class="text-gray-800 text-xl font-extrabold">Address</h2>
        <p class="text-gray-800 text-md mt-2">
          {{ this.metadata.address }}
        </p>
        <h2 class="text-gray-800 text-xl font-extrabold">Passphrase</h2>
        <p class="text-gray-800 text-md mt-2">
          {{ this.metadata.passphrase.join(" ") }}
        </p>
        <h2 class="text-gray-800 text-xl font-extrabold">Entropy</h2>
        <p class="text-gray-800 text-md mt-2">
          {{ this.metadata.entropy }}
        </p>
        <h2 class="text-gray-800 text-xl font-extrabold">Public Key</h2>
        <p class="text-gray-800 text-md mt-2">
          {{ this.metadata.publicKey }}
        </p>
        <h2 class="text-gray-800 text-xl font-extrabold">WIF</h2>
        <p class="text-gray-800 text-md mt-2">
          {{ this.metadata.wif }}
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import WalletService from "../services/WalletService";
export default {
  components: { Navbar, Loader },
  mounted() {
    const onSuccess = () => {
      this.isLoading = false;
    };
    console.log(WalletService.generate(onSuccess));
  },
  data: () => ({
    isLoading: true,
    metadata: {
      address: "AQXtnzu3HBBhGhCgnKzTTTgoVfJpgrcuK3",
      passphrase: ["exchange", "limit", "immune"],
      entropy: "4eb03dc682efe1f0cd26e774d89d615e",
      publicKey:
        "02d302117e1fb88fa5b187969c8612d1e87ec2d409a330685f39ee46f18e5a16ef",
      wif: "SD5JC9c6riBewYgQWMvAceyTd9P1hxgJZfVemtt4xcRQycPjrWBa"
    }
  })
};
</script>

<style>
.illustration {
  height: 320px;
}
</style>
