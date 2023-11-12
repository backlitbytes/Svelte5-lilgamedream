export let gamedreamElemRef: HTMLDivElement | null = null;
export function assignGamedreamRef(ref: HTMLDivElement | null) {
	gamedreamElemRef = ref;
}

export function getGameLoadingSpotAbove() {
	if (!gamedreamElemRef) {
		return { top: 0, left: 0 };
	}
	const { top, left } = gamedreamElemRef.getBoundingClientRect();
	return { top: top - 60, left: left + 70 };
}

export function getGameLoadedSpot() {
	if (!gamedreamElemRef) {
		return { top: 0, left: 0 };
	}
	const { top, left } = gamedreamElemRef.getBoundingClientRect();
	return { top: top - 20, left: left + 70 };
}

class GameDream {
	hue = $state(0);
	sat = $state(0);
	isOn = $state(false);

	bumpHue = () => {
		this.hue += 1;
	};
}

export const gamedream = new GameDream();
