<template>
<div> 
	<h1>Detail ({{ docId }})</h1>
	<div class="row">Your Numbers: {{ numbers }}</div>
	<div class="row">Winning Numbers: {{ winningNumbers }}</div>
	<div class="row">Bet: {{ bet > 0 ? 'WON' : 'LOST' }}</div>
	<div class="row">Amount: {{ bet }}&euro;</div>
	<div class="row">Date: {{ timestamp }}</div>
	<div class="row"><button @click="goBack">Back to History</button></div>
</div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();
const usersCollection = db.collection('bets');

export default {
    name: 'Detail',
	data() {
		return {
			docId: '',
			uuid: '',
			bet: '',
			numbers: '',
			winningNumbers: '',
			timestamp: ''
		}
	},
	mounted() {
		let id = this.$route.params.id;
		usersCollection.doc(id).get().then((docRef) => {
				this.docId = docRef.id;
				this.uuid = docRef.data().uuid;
				this.bet = docRef.data().bet;
				this.numbers = docRef.data().numbers;
				this.winningNumbers = docRef.data().winningNumbers;
				let storedTimestamp = docRef.data().timestamp;
				this.timestamp = new Date(storedTimestamp.seconds * 1000)	
		})	
	},
    methods: {
		goBack() {
			this.$router.push('/history');
		}
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.delete {
	color:red;
	cursor:pointer;
}
.row {
	border-bottom:1px solid #ccc;
	padding:10px;
}
</style>
