<template>
<div> 
	<h2>Selected Numbers: {{ selected }}</h2>
	<div style="float:right">
	<div class="numbers-right-side">
	
	</div>
	<div class="clear"></div>
	<p><button class="submit" :disabled="selected < 5" @click="goToDrawPage">Submit</button></p>
	</div>
	<div class="numbers-left-side">
		<div v-for="index in 30" :key="index" class="number notselected" :rel="index">
			<span class="close">x</span>
			{{ index }}
		</div>
	</div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'Dashboard',
	data: () => ({
				selected: 0,
				numbers: []
				}),
        mounted() {
			this.$nextTick(function () {
			let ref = this;
			$('.number').on('click', function () {
			let rel = $(this).attr('rel');
			if ($(this).hasClass("notselected")) {
				if (ref.selected < 5) {
					$(this).detach().appendTo('.numbers-right-side');
					$(this).removeClass('notselected');
					$(this).find('span').show();
					ref.selected++;
					ref.numbers.push(rel);
				}
			}
			else {
				$(this).detach().appendTo('.numbers-left-side');
				$(this).addClass('notselected');
				$(this).find('span').hide();
				ref.selected--;	
				ref.numbers = ref.numbers.filter(item => item !== rel)				
			}
			});		
			});	
        },
		methods: {
			goToDrawPage() {
				let params = this.numbers.join(',');
				this.$router.push({ path: '/draw', query: { numbers: params } })
			}
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
	margin-top:50px;
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
	position:relative;
}
.submit {

}
.clear {
	clear:both;
}
.close {
	display:none;
	text-align:center;
	cursor:pointer;
	background:#333;
	color:#fff;
	position:absolute;
	right:0;
	top:0;
	border:1px solid #ccc;
	border-radius:50%;
	padding:5px;
	right: -10px;
    top: -10px;
	z-index:1000;
}
</style>
