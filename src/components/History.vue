<template>
<div> 
	<h1>History</h1>
	<p v-if="!history.length">You have not played in any games yet!</p>
	<table cellpadding="5" align="center" cellspacing="1" border="1" v-else>
		<tr>
			<th>Bet</th>
			<th>Numbers</th>
			<th>Timestamp</th>
			<th>Actions</th>
			<th>Details</th>
		</tr>
		<tr v-for="(index,key) in history" :key="key" :data-row-doc="index.docId">
			<td>{{ index.bet > 0 ? 'WON' : 'LOST' }}</td>
			<td>{{ index.numbers }}</td>
			<td>{{ index.timestamp }}</td>
			<td> <span class="delete" @click="deleteRow(index.docId)" :data-uuid="index.uuid">[ X ]</span></td>
			<td><button @click="goToDetail(index.docId)">View</button></td>
		</tr>
	</table>
</div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';
import $ from 'jquery';

const db = firebase.firestore();
const auth = firebase.auth()
const usersCollection = db.collection('bets');

export default {
    name: 'History',
    data() {
        return {
			history: []
        };
    },
	mounted() {
		usersCollection.where('userID', '==', auth.currentUser.uid).orderBy('timestamp', 'desc').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let docId = doc.id;
				let uuid = doc.data().uuid;
				let bet = doc.data().bet
				let numbers = doc.data().numbers
				let storedTimestamp = doc.data().timestamp;
				let timestamp = new Date(storedTimestamp.seconds * 1000)
				this.history.push({'docId': docId, 'uuid': uuid, 'bet': bet, 'numbers': numbers, 'timestamp': timestamp});
			})
		})	
	},
    methods: {
		deleteRow(id) {
			if (confirm('Are you sure you want to delete this record?')) {
				if (id) {
					usersCollection.doc(id).delete().then(() => {
						$('tr[data-row-doc='+id+']').remove();
					});
				}
			}
		},
		goToDetail(id) {
			this.$router.push({ name: 'Detail', params: { id: id } })
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
</style>
