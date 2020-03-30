<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'GMap' }" class="brand-logo left"
          >Vuejs App</router-link
        >
        <ul class="right">
          <div v-if="!user">
            <li>
              <router-link :to="{ name: 'Signup' }">Signup</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Login' }">Login</router-link>
            </li>
          </div>
          <div v-else>
            <li>
              <a>{{ user.email }}</a>
            </li>
            <li>
              <a @click="logout">Logout</a>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style></style>
