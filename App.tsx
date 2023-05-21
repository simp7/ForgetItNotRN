import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { DarkTheme, LightTheme } from './source/model/theme';
import { Navigator } from './source/view/Navigator';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';
	const theme = isDarkMode ? DarkTheme : LightTheme;

	return (
		<NavigationContainer>
			<ThemeProvider theme={LightTheme}>
				<Navigator />
				<StatusBar hidden />
			</ThemeProvider>
		</NavigationContainer>
	);
};

export default App;
