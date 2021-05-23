<template>
  <v-card class="form-card" dark>
    <v-card-title>Sign in</v-card-title>
    <v-form @submit="signIn">
      <v-text-field
          v-model="email"
          :rules="AuthService.emailRules"
          label="email"
          outlined
          type="email"
      ></v-text-field>
      <v-text-field
          v-model="password"
          :rules="AuthService.passwordRules"
          label="password"
          outlined
          type="password"
      ></v-text-field>
      <v-card-actions>
        <v-btn color="primary" depressed type="submit">Sign in</v-btn>
      </v-card-actions>
    </v-form>
    <v-alert
        v-if="error"
        type="error"
    >
      {{ error }}
    </v-alert>
  </v-card>
</template>

<script>
import AuthService from "../../services/AuthService";
import router from "../../router";

export default {
  name: "SignInComponent",
  data() {
    return {
      AuthService,
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    signIn(e) {
      e.preventDefault();
      AuthService.signIn(this.email, this.password)
          .then(() => router.push("my-cards"))
          .catch(e => this.error = e.response.data.message);
    }
  }
}
</script>

<style scoped>
.form-card {
  padding: 1em;
}
</style>