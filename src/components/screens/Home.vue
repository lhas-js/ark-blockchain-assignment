<template>
  <main class="flex flex-col h-screen">
    <Navbar />
    <div class="flex items-center flex-1 text-center">
      <div class="container mx-auto">
        <h2 class="text-gray-800 text-3xl font-bold">
          Start using our ARK Wallet
        </h2>
        <p class="text-gray-800 text-md mt-2">
          Generate Your Own Unique Passphrase and Address
        </p>
        <PrimaryButton>Create new wallet</PrimaryButton>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from "../core/Navbar";
import PrimaryButton from "../core/PrimaryButton";
export default {
  components: { Navbar, PrimaryButton }
};
</script>

<style></style>
