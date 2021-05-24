<template>
  <v-container class="main">
    <v-row justify="center">
      <v-col md="5">
        <v-card class="form-card" dark>
          <v-card-title>Sign in</v-card-title>
          <v-form ref="form" @submit="signIn" class="form">
            <v-text-field
                v-model="email"
                :rules="AuthService.emailRules"
                label="email"
                outlined
                type="email"
                class="form-field"
            ></v-text-field>
            <v-text-field
                v-model="password"
                :rules="AuthService.passwordRules"
                label="password"
                outlined
                type="password"
                class="form-field"
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
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="sign-up-container">
      <p class="sign-up-msg">Don't have an account yet?</p>
      <v-btn outlined color="primary" depressed type="submit" to="sign-up">Sign up</v-btn>
    </v-row>
  </v-container>
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
      if (!this.$refs.form.validate()) {
          return;
      }

      AuthService.signIn(this.email, this.password)
          .then(() => router.push("my-collections"))
          .catch(e => this.error = e.response.data.message);
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 4em;
}

.form-card {
  padding: 1em;
}

.form-field:first-child {
  margin-bottom: 1.5em !important;
}

.sign-up-container {
  font-size: 1.2em;
}

.sign-up-msg {
  padding: 0;
  margin: 0 0.5em 0 0;
}
</style>
