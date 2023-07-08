import { DarkTheme as NavDark, DefaultTheme as NavLight, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { rstDarkMode } from './source/model/setting';
import { DarkTheme, LightTheme } from './source/model/theme';
import { Navigator } from './source/view/Navigator';

const AppUI = () => {
	const isDarkMode = useRecoilValueLoadable(rstDarkMode);
	const theme = isDarkMode.contents ? DarkTheme : LightTheme;
	const navTheme = isDarkMode.contents ? NavLight : NavDark;

	return (
		<NavigationContainer theme={navTheme}>
			<ThemeProvider theme={theme}>
				<Navigator />
				<StatusBar hidden />
			</ThemeProvider>
		</NavigationContainer>
	);
};

const App = () => {
	return (
		<RecoilRoot>
			<AppUI />
		</RecoilRoot>
	);
};

export default App;
