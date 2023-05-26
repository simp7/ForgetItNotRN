export const color = {
	white: '#f3f3f3',
	black: '#000000',
	forgetMeNot: '#B1C9F9',
	forgetMeNotDark: '#4789D2',
	lightGray: '#F0F0F0',
	lime: '#6FFF57',
	grapefruit: '#FF6969',
	darkGray: '#484848',
	lightBlack: '#181818',
	gray: '#A4A4A4',
	gray6: '#666666',
	gray5: '#555555',
	redGray: '#F0E0E0',
};

const CommonColors = {
	tint: color.forgetMeNot,
	highlight: color.forgetMeNotDark,

};

const LightColors = {
	...CommonColors,
	background: color.white,
	card: color.lightGray,
	wrong: color.redGray,
	cardText: color.black,
	placeHolder: color.gray5,
};

const DarkColors: Colors = {
	...CommonColors,
	background: color.lightBlack,
	card: color.darkGray,
	wrong: color.redGray,
	cardText: color.white,
	placeHolder: color.gray,
};

export type Colors = typeof LightColors;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
  }
}

export const LightTheme = {
	colors: LightColors,
};

export const DarkTheme = {
	colors: DarkColors,
};