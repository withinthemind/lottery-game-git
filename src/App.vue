<template>
    <div id="app">
		<div class="container">
			<div id="nav">
				<router-link to="/">Login</router-link> |
				<router-link to="/register">Register</router-link> | 
				<router-link to="/dashboard">Play</router-link> |
				<router-link to="/history">History</router-link> |
				<router-link to="/stats">Stats</router-link> |
				<a class="logout" @click="logout">Logout <img src="./assets/user.png" /></a>
			</div>
			<router-view />
		</div>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    alert('Successfully logged out');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },
    },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.container {
	width:1024px;
	margin:auto;
}
.logout {
	cursor:pointer;
}
</style>