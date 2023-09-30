import Sound from 'react-native-sound';

enum source {
	correct = 'correct.mp3',
	complete = 'tada.mp3',
	trash = 'trash.mp3',
	wrong = 'wrong.mp3',
}
Sound.setCategory('Ambient', true);

const newSound = (source: source) => new Sound(source, Sound.MAIN_BUNDLE, err => {
	if (err) {
		console.log('failed to load the sound', err);
		return;
	}
});

const correctSound = newSound(source.correct);
const wrongSound = newSound(source.wrong);
const deleteSound = newSound(source.trash);
const completeSound = newSound(source.complete);

const playSound = (sound: Sound) => (volume: number) => sound.stop().setVolume(volume).play();

export const playCorrectSound = playSound(correctSound);
export const palyWrongSound = playSound(wrongSound);
export const playDeleteSound = playSound(deleteSound);
export const playCompleteSound = playSound(completeSound);