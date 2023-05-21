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
    color: Colors;
  }
}

export const LightTheme = {
  color: LightColors,
};

export const DarkTheme = {
  color: DarkColors,
};