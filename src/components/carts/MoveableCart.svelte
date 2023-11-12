<script lang="ts">
	import { onMount } from 'svelte';
	import Cartridge from './Cartridge.svelte';
	import { startSound } from '../../audio/sounds';
	import { carts, type CartData } from '../../stores/carts';
	import { gamedream, gamedreamElemRef } from '../../stores/gamedream';
	import type { SceneName } from '../../games/index.svelte';

	const { cart, topPerc, leftPerc } = $props<{
		cart: CartData;
		topPerc: number;
		leftPerc: number;
	}>();

	let selected = false;
	let placed = false;
	let sceneLoaded = false;

	let animationID: any = 0; // TODO: these id types...
	let sceneSwapID: any = 0;
	let rainbowID: any = 0;

	let switchScene: (newSceneKey: SceneName) => void;
	onMount(async () => {
		switchScene = (await import('../../games/index.svelte')).switchScene;
	});

	function onSelected(isSelected: boolean) {
		clearTimeout(animationID);
		clearInterval(rainbowID);

		if (isSelected) {
			selected = true;
			animationID = setTimeout(() => {
				placed = true;

				clearTimeout(sceneSwapID);
				sceneSwapID = setTimeout(() => {
					gamedream.isOn = true;
					switchScene(cart.scene);
					sceneLoaded = true;
					gamedream.hue = cart.hue;
					gamedream.sat = cart.sat;

					startSound.play();

					if (cart.scene.startsWith('Rainbow')) {
						rainbowID = setInterval(gamedream.bumpHue, 200);
					}
				}, 1000);
			}, 1000);
		} else {
			if (sceneLoaded) {
				clearTimeout(sceneSwapID);
				sceneLoaded = false;
				switchScene('Blank');
				gamedream.hue = 0;
				gamedream.sat = 0;
				gamedream.isOn = false;
			}
			placed = false;
			animationID = setTimeout(() => {
				selected = false;
			}, 200);
		}
	}

	$effect(() => {
		onSelected(cart.selected);
	});

	const xOffset = 60;

	function gameBox() {
		return gamedreamElemRef?.getBoundingClientRect()!; // TODO, don't bang
	}

	function selectedTransform() {
		return `translate(${gameBox().x + xOffset}px, ${gameBox().y - 120}px) scale(1)`;
	}

	function placedTransform() {
		return `translate(${gameBox().x + xOffset}px, ${gameBox().y - 55}px) scale(1)`;
	}

	function startingTransform() {
		return `scale(0.3) translate(${leftPerc}%, ${topPerc}%)`;
	}
</script>

<div
	class="cart"
	style:transform={selected
		? placed
			? placedTransform()
			: selectedTransform()
		: startingTransform()}
	style:z-index={selected ? 1 : undefined}
>
	<Cartridge cartData={cart} onClick={() => carts.toggleSelect(cart.scene, !cart.selected)} />
</div>

<style>
	.cart {
		position: absolute;
		transition: transform 500ms ease-in-out;
	}

	.cart:hover {
		z-index: 1;
	}
</style>
