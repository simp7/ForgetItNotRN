export const color = {
	white: '#f3f3f3',
	black: '#000000',
};

interface Colors {
  background: string;
}

const LightColors: Colors = {
	background: color.white,
};

const DarkColors: Colors = {
	background: color.black,
};

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