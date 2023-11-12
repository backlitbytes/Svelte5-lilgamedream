<script lang="ts">
	import AllCarts from '../components/carts/AllCarts.svelte';
	import { handleInputUp } from '../stores/click-touch-input-handling';
	import { onMount } from 'svelte';
	import { loadAudio } from '../audio/sounds';
	import Gamedream from '../components/gamedream/Gamedream.svelte';
	import { gamedream } from '../stores/gamedream';
	import { chickenDinner } from '../stores/winner.svelte';

	onMount(() => {
		loadAudio();
		window.addEventListener('mouseup', handleInputUp);
		window.addEventListener('touchend', handleInputUp);
	});

	$effect(() => {
		if (typeof window !== 'undefined') {
			if (gamedream.isOn) {
				document.body.style.background = `hsl(${gamedream.hue}deg ${gamedream.sat}% 75%)`;
			} else {
				document.body.style.background = `white`;
			}
		}
	});
</script>

<div class="wrapper disable-select" class:winner={chickenDinner.hasWon}>
	<AllCarts />
	<Gamedream><div id="game-screen" /></Gamedream>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100dvh;
		padding-top: 50px;
		-webkit-overflow-scrolling: touch;
		width: 100vw;
		position: relative;
		transition: transform ease-in-out 20s;
	}

	@keyframes hue-rotate {
		from {
			filter: hue-rotate(0deg);
		}
		to {
			filter: hue-rotate(360deg);
		}
	}

	.wrapper.winner {
		background: green;
		animation: hue-rotate 5s linear infinite;
		transform: scale(3);
	}
</style>
