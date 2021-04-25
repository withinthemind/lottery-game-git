<template>
	<div>
		<div class="form-wrapper">
			<form @submit.prevent="login">     
			<h2>Login</h2>     
			<input type="email" placeholder="Email address..." v-model="email" />     
			<input type="password" placeholder="password..." v-model="password" />     
			<button type="submit">Login</button>   
			</form>
		</div>  
	</div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'Home',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully logged in');
                    this.$router.push('/dashboard');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-wrapper {
	margin:auto;
	width:500px;
	text-align:center;
}
input {
	border:1px solid #ccc;
	border-radius:5px;
	padding:10px;
	display:block;
	margin:auto;
	margin-bottom:10px;
	width:250px;
}
button {
	background:#3b5ca7;
	outline:none;
	border:1px solid #ccc;
	padding:10px;
	text-align:center;
	color:#fff;
	cursor:pointer;
}
</style>
