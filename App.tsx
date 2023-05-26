import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { DarkTheme, LightTheme } from './source/model/theme';
import { now } from './source/util/date';
import { getLastOpenedDate } from './source/util/storage';
import { Navigator } from './source/view/Navigator';

const initialize = async () => {
	const date = await getLastOpenedDate();
	if (date === "") {
		return;
	}
	if (date !== now()) {
		return;
	}
};

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';
	const theme = LightTheme;
	useEffect(() => {
		initialize();
	}, []);

	return (
		<RecoilRoot>
			<NavigationContainer>
				<ThemeProvider theme={theme}>
					<Navigator />
					<StatusBar hidden />
				</ThemeProvider>
			</NavigationContainer>
		</RecoilRoot>
	);
};

export default App;
