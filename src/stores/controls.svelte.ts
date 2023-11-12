export type ValidDPad = 'ArrowRight' | 'ArrowDown' | 'ArrowLeft' | 'ArrowUp';

export type ValidInput = ValidDPad | 'a' | 'b' | 'Escape' | 'Enter' | 'None';

export type ControlState = Record<ValidInput, Control>;

class Control {
	active = $state(false);
}

class Controls {
	map = $state<ControlState>({
		ArrowRight: new Control(),
		ArrowDown: new Control(),
		ArrowLeft: new Control(),
		ArrowUp: new Control(),
		a: new Control(),
		b: new Control(),
		Escape: new Control(),
		Enter: new Control(),
		None: new Control()
	});

	validKeys = Object.keys(this.map);

	constructor() {
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', (event) => {
				if (this.validKeys.includes(event.key as ValidInput)) {
					this.setActive(event.key as ValidInput, true);
				}
			});

			window.addEventListener('keyup', (event) => {
				if (this.validKeys.includes(event.key as ValidInput)) {
					this.setActive(event.key as ValidInput, false);
				}
			});
		}
	}

	active = (input: ValidInput) => {
		return this.map[input].active;
	};

	setActive = (input: ValidInput, on: boolean) => {
		this.map[input].active = on;
	};
}

export const controls = new Controls();
