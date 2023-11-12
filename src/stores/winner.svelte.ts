class ChickenDinner {
	hasWon = $state(false);

	win = () => {
		this.hasWon = true;
	};
}

export const chickenDinner = new ChickenDinner();
