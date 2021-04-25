<template>
<div> 
	<h1>Stats</h1>
	<p>Below you can see the stats for all lottery games.</p>
	<div class="row">Games: {{ games }}</div>
	<div class="row">Won: {{ won }}</div>
	<div class="row">Lost: {{ lost }}</div>
	<div class="row">Earnings: {{ earnings }}&euro;</div>
	<div class="row">
		<h3>Top 5 Numbers Drawn</h3>
		<table cellpadding="3" cellspacing="1" border="1" align="center">
			<tr>
				<th>Number</th>
				<th>Occured</th>
			</tr>
			<tr v-for="(index, key) in numbers.slice(0,5)" :key="key">
				<td>{{ index.number }}</td>
				<td>{{ index.count }}</td>
			</tr>
		</table>
	</div>
</div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const usersCollection = db.collection('bets');

export default {
    name: 'Stats',
    data() {
        return {
			games: 0,
			won: 0,
			lost: 0,
			earnings: 0,
			numbers: []
        };
    },
	mounted() {
		usersCollection.orderBy('timestamp', 'desc').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				this.games++
				doc.data().bet > 0 ? this.won++ : this.lost++
				this.earnings = doc.data().bet + this.earnings;
				let split = doc.data().winningNumbers ? doc.data().winningNumbers.split(',').map(Number) : false;
				let ref = this;
				if (split.length) {
					split.forEach(function(i) {
					let object = ref.numbers.find(({ number }) => number === i);
						if (object) {
							let increment = object.count + 1;
							Object.assign(object, { count: increment});
						}
						else {
							ref.numbers.push({'number': i, 'count': 1});
						}
					})
				}
			})
			this.numbers.sort((a,b) => b.count - a.count);
		})		
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
	border-bottom:1px solid #ccc;
	padding:10px;
}
</style>
