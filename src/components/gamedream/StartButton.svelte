<script lang="ts">
	import { registerInputDown } from '../../stores/click-touch-input-handling.svelte';
	import { controls, type ValidInput } from '../../stores/controls.svelte';

	const { control } = $props<{ control: ValidInput }>();
</script>

<div class="center">
	<button
		class:active={controls.active(control)}
		ontouchstart={(event) => registerInputDown(event, control)}
		onmousedown={(event) => registerInputDown(event, control)}
	/>
	<div class="word">
		<slot />
	</div>
</div>

<style>
	button {
		width: 30px;
		height: 10px;
		background-color: rgb(23, 23, 23);
		border-radius: 8px;
		border: none;
		box-shadow: 1px 1px 3px rgb(126, 127, 145) inset, -1px -1px 3px rgb(12, 12, 83) inset;
		transition: box-shadow 0.2s ease, transform 0.2s ease;
		cursor: pointer;
	}

	button:active,
	button.active {
		box-shadow: 0px 0px 2px rgb(126, 127, 145) inset, 0px 0px 2px rgb(12, 12, 83) inset;
		transform: translateY(1px);
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.word {
		color: black;
		text-transform: uppercase;
		font-size: 9px;
		text-align: center;
		padding-top: 5px;
		text-shadow: 0px -2px 1px rgba(88, 144, 188, 0.74);
		opacity: 0.2;
	}
</style>
