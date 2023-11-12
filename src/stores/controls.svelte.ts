export type ValidDPad = 'ArrowRight' | 'ArrowDown' | 'ArrowLeft' | 'ArrowUp';

export type ValidInput = ValidDPad | 'a' | 'b' | 'Escape' | 'Enter' | 'None';

const buttons: ValidInput[] = [
	'ArrowRight',
	'ArrowDown',
	'ArrowLeft',
	'ArrowUp',
	'a',
	'b',
	'Escape',
	'Enter'
];

export type ControlState = Partial<Record<ValidInput, boolean>>;

class Controls {
	map = $state<ControlState>({});

	constructor() {
		buttons.forEach((button) => {
			this.map[button] = false;
		});

		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', (event) => {
				if (buttons.includes(event.key as ValidInput)) {
					this.map[event.key as ValidInput] = true;
				}
			});

			window.addEventListener('keyup', (event) => {
				if (buttons.includes(event.key as ValidInput)) {
					this.map[event.key as ValidInput] = false;
				}
			});
		}
	}
}

export const controls = new Controls();
