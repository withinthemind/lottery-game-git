<template>
	<div>
		<div class="form-wrapper">
			<form @submit.prevent="register">
			<h2>Register</h2>
			<input type="email" placeholder="Email address..." v-model="email" />
			<input type="password" placeholder="password..." v-model="password" />
			<button type="submit">Register</button>
			</form>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/');
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
