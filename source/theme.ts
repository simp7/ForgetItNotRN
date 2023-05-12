import { DefaultTheme } from 'styled-components';


export const color = {
  white: '#f3f3f3',
  black: '#000000',
};

interface Colors {
  background: string;
}

export const LightTheme: Colors = {
  background: color.white,
};

export const DarkTheme: Colors = {
  background: color.black,
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
  }
}