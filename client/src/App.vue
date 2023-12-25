<script setup>
import { ref } from "vue";

const url = ref("");
const data = ref("");

const sendUrl = async () => {
  const res = await fetch("http://localhost:4545/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url.value,
    }),
  });
  const jsonData = await res.json();
  data.value = jsonData;
  console.log(data);
};
</script>

<template>
  <div>
    <h1>Youtube MP3</h1>
    <form @submit.prevent="sendUrl()">
      <input type="url" v-model="url" placeholder="Url" />
      <button type="submit">Download MP3</button>
    </form>
    <a v-if="data && data.url" :href="data.url" download>Télécharger MP3</a>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
