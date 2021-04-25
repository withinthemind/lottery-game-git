<template>
<div> 
	<p class="draw-header">The Live Draw will begin in <span id="countdowntimer">3 </span> Seconds</p>
	<div style="float:right">
		<div class="numbers-right-side">
			<h2>Your Numbers</h2>
			<div v-for="index in playerNumbers" :key="index" class="number" :rel="index">
				{{ index }}
			</div>
			<div class="clear"></div>
			<h2 class="winning-heading">Winning Amount: {{ winningAmount }}&euro;</h2>
			<p v-if="winningNumbersMatch >= winningNumbersThreshhold">Congratulations you won!</p>
		</div>
	<div class="clear"></div>
	</div>
	<div class="numbers-left-side">
		<h2>Drawn Numbers</h2>
		<div v-for="index in winningNumbers" :key="index" class="number" :rel="index">
			{{ index }}
		</div>
	</div>
	<div class="modal">
		<div class="content">
			<h2>Winning Amount: {{ winningAmount }}&euro;</h2>
			<p>The draw has finished!</p>
			<button @click="playAgain">Play again!</button>
			<button @click="saveToHistory">Save to history</button>
		</div>
	</div>	
</div>
</template>

<script>
import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const db = firebase.firestore();
const auth = firebase.auth()
const usersCollection = db.collection('bets');

export default {
  name: 'Draw',
	data: () => ({
				selected: 0,
				status: 0,
				playerNumbers: [],
				lotteryNumbers: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
				drawnNumbers: 0,
				winningNumbers: [],
				winningAmount: 0,
				winningNumbersMatch: 0,
				winningNumbersThreshhold: 3
				}),
        mounted() {
			this.$nextTick(function () {
			let timeleft = 3;
			let ref = this;
				var downloadTimer = setInterval(function(){
				timeleft--;
				document.getElementById("countdowntimer").textContent = timeleft;
				if(timeleft == 0) {
					clearInterval(downloadTimer);
					ref.startDraw();
					}
				},1000);
			
			let query = this.$route.query.numbers;
			if (!query) this.$router.push('/dashboard');
			let split = query.split(',').map(Number);
			this.playerNumbers = split;
				
			});	
        },
		methods: {
			startDraw() {
				let ref = this;
				let beginDraw = setInterval(function(){
					if (ref.drawnNumbers < 5) {
					let index = Math.floor(Math.random()* ref.lotteryNumbers.length);
					let number = ref.lotteryNumbers[index];
					ref.lotteryNumbers.splice( index, 1 );
					ref.winningNumbers.push(number);
					ref.drawnNumbers++;
					if(ref.playerNumbers.includes(number) === true) {
							$('.numbers-right-side .number[rel="'+number+'"]').addClass('match');
							ref.winningNumbersMatch++
						}
					}
					else {
						clearInterval(beginDraw);
						$('.modal').show();
					}
				},4000);
			},
			playAgain() {
				this.$router.push('/dashboard');
			},
			saveToHistory() {
				const vm = this;
				usersCollection.add({
					uuid: uuidv4(),
					userID: auth.currentUser.uid,
					bet: this.winningAmount,
					numbers: this.playerNumbers.join(),
					winningNumbers: this.winningNumbers.join(),
					timestamp: new Date(),
				})
				.then(function() {
					vm.$router.push('/dashboard');
				})			
			}
		},
		watch: {
			winningNumbersMatch: function (val) {
				if (val == 3) {
					this.winningAmount = 5;
				}
				if (val == 4) {
					this.winningAmount = 10;
				}
				if (val == 5) {
					this.winningAmount = 20;
				}				
			},		
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.numbers-left-side {
	float:left;
	width:360px;
	margin-top:50px;
}
.numbers-right-side {
	width:360px;
	margin-top:70px;
	margin-bottom:50px;	
}
.number {
	width:50px;
	height:50px;
	text-align:center;
	padding:10px;
	border:1px solid #ccc;
	float:left;
	cursor:pointer;
}
.submit {

}
.clear {
	clear:both;
}
.match {
	background:green;
	color:#fff;
}
.winning-heading {
	margin-top:100px;
}
.modal {
  display: none; 
  position: fixed; 
  z-index: 1; 
  padding-top: 100px; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto;
  background-color: rgba(0,0,0,0.8); 
}
.modal .content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%
}
button {
	outline:none;
	padding:15px;
	text-align:center;
	background:#3a80c5;
	color:#fff;
	text-align:center;
	border:0;
	margin-right:20px;
	cursor:pointer;
}
</style>
