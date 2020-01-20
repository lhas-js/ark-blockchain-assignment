<template>
  <main class="flex flex-col h-screen">
    <Navbar />
    <div class="flex items-center flex-1 text-center">
      <div class="container mx-auto">
        <img
          class="illustration mx-auto mb-4"
          src="../assets/home-illustration.jpg"
        />
        <h2 class="text-gray-800 text-5xl font-extrabold">ARK Blockchain</h2>
        <p class="text-gray-800 text-md mt-2">
          Welcome to the ARK ecossystem. You can start generating a new wallet
          or exploring existing wallets.
        </p>
        <PrimaryButton to="/generate" class="mt-4"
          >Generate a new wallet</PrimaryButton
        >
        <FlatButton to="/explore" class="mt-4 ml-3"
          >Explore a wallet</FlatButton
        >
        <p class="mt-4 text-gray-500">or</p>
        <router-link
          class="text-gray-500 hover:text-gray-600 text-sm underline mt-2 rounded block p-2 mb-6"
          to="/explore/delegates"
          >Delegate Monitor</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from "../components/Navbar";
import { PrimaryButton, FlatButton } from "../components/buttons";
export default {
  components: { Navbar, PrimaryButton, FlatButton }
};
</script>

<style scoped>
.illustration {
  height: 320px;
}
</style>
