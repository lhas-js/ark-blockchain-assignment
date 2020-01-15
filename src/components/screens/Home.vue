<template>
  <main class="flex flex-col h-screen">
    <Navbar />
    <div class="flex items-center flex-1 text-center">
      <div class="container mx-auto">
        <img
          class="illustration mx-auto mb-4"
          src="../../assets/home-illustration.jpg"
        />
        <h2 class="text-gray-800 text-5xl font-extrabold">
          ARK Paper Wallet
        </h2>
        <p class="text-gray-800 text-md mt-2">
          Generate Your Own Unique Passphrase and Address
        </p>
        <PrimaryButton class="mt-4">Create a new wallet</PrimaryButton>
        <FlatButton class="mt-4 ml-3">Enter a secret passphrase</FlatButton>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from "../core/Navbar";
import { PrimaryButton, FlatButton } from "../core/buttons";
export default {
  components: { Navbar, PrimaryButton, FlatButton }
};
</script>

<style>
.illustration {
  height: 320px;
}
</style>
