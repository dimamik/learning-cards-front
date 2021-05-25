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
                label="username"
                outlined
                type="text"
                class="form-field"
            ></v-text-field>
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
    <v-row justify="center" align="center" class="sign-up-container">
      <p class="sign-up-msg">Already have an account?</p>
      <v-btn outlined color="primary" depressed type="submit" to="sign-in">Sign in</v-btn>
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
