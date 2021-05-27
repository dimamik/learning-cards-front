<template>
  <div>
    <v-navigation-drawer
        v-model=drawer
        app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Learning Cards App
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items.filter(i => !i.auth || AuthService.current)"
            :key="item.title"
            link
            v-bind:to="{path: '/' + item.route}"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="auth-btn-container">
        <v-menu v-if="AuthService.current" offset-y rounded="rounded">
          <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" color="secondary">{{ AuthService.current.userName }}
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link @click="signOut">
              <v-icon>mdi-logout</v-icon>
              <v-list-item-title>Sign out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <div v-else>
          <v-btn color="primary" to="sign-in">Sign in</v-btn>
          <v-btn class="sign-up-btn" color="secondary" outlined to="sign-up">Sign up</v-btn>
        </div>
      </div>
    </v-app-bar>

  </div>

</template>

<script>

import router from "../router";
import AuthService from "@/services/AuthService";

export default {
  name: "NavigationBar",
  data: () => ({
    AuthService,
    current: AuthService.current,
    drawer: null,
    items: [
      {title: 'All Collections', icon: 'mdi-library', route: 'collections', auth: false},
      {title: 'My Collections', icon: 'mdi-cards', route: 'my-collections', auth: true},
      {title: 'Liked Collections', icon: 'mdi-thumb-up', route: 'liked-collections', auth: true},
      // {title: 'Learn Collection', icon: 'mdi-school', route: 'learn-collection'}
    ],
    right: null
  }),
  methods: {
    signOut() {
      AuthService.signOut()
          .then(() => {
            if (router.currentRoute.name !== 'collections') {
              router.push("/collections")
            }
          });
    }
  }
}
</script>

<style scoped>
.auth-btn-container {
  margin-left: auto
}

.sign-up-btn {
  margin-left: 1em;
}
</style>
