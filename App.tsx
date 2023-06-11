import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { DarkTheme, LightTheme } from './source/model/theme';
import { now } from './source/util/date';
import { loadLastOpenedDate } from './source/util/storage';
import { Navigator } from './source/view/Navigator';

const initialize = async () => {
	const date = await loadLastOpenedDate();
	if (date === "") {
		return;
	}
	if (date !== now()) {
		return;
	}
};

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';
	// const theme = isDarkMode ? DarkTheme : LightTheme;
	const theme = LightTheme;
	useEffect(() => {
		initialize();
		StatusBar.setBackgroundColor('transparent');
		StatusBar.setTranslucent(true);
		StatusBar.setBarStyle("dark-content");
	}, []);

	return (
		<RecoilRoot>
			<NavigationContainer>
				<ThemeProvider theme={theme}>
					<StatusBar backgroundColor={theme.colors.background} />
					<Navigator />
					<StatusBar hidden />
				</ThemeProvider>
			</NavigationContainer>
		</RecoilRoot>
	);
};

export default App;
