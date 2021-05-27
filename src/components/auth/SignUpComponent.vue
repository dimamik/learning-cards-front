<template>
  <v-container class="main">
    <v-row justify="center">
      <v-col md="5">
        <v-card class="form-card">
          <v-card-title>Sign up</v-card-title>
          <v-form ref="form" @submit="signUp">
            <v-text-field
                v-model="username"
                :rules="AuthService.usernameRules"
                class="form-field"
                label="username"
                outlined
                type="text"
            ></v-text-field>
            <v-text-field
                v-model="email"
                :rules="AuthService.emailRules"
                class="form-field"
                label="email"
                outlined
                type="email"
            ></v-text-field>
            <v-text-field
                v-model="password"
                :rules="AuthService.passwordRules"
                class="form-field"
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
      </v-col>
    </v-row>
    <v-row align="center" class="sign-up-container" justify="center">
      <p class="sign-up-msg">Already have an account?</p>
      <v-btn color="primary" depressed outlined to="sign-in" type="submit">Sign in</v-btn>
    </v-row>
  </v-container>
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
      if (!this.$refs.form.validate()) {
        return;
      }

      AuthService.signUp(this.username, this.email, this.password)
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

.form-field:not(:last-child) {
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
