<template>
  <v-card class="form-card" dark>
    <v-card-title>Sign up</v-card-title>
    <v-form @submit="signUp">
      <v-text-field
          v-model="username"
          :rules="AuthService.usernameRules"
          label="username"
          outlined
          type="text"
      ></v-text-field>
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
        <v-btn color="primary" depressed type="submit">Sign up</v-btn>
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
  name: "SignUpComponent",
  data() {
    return {
      AuthService,
      username: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    signUp(e) {
      e.preventDefault();
      AuthService.signUp(this.username, this.email, this.password)
          .then(() => router.push("my-collections"))
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