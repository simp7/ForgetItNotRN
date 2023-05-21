import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';

import { DarkTheme, LightTheme } from './source/model/theme';
import { Navigator } from './source/view/Navigator';

const Container = styled(View)`
  flex: 1;
	align-self: stretch;
	align-items: center;
	justify-content: center;
	background-color: black;
`;

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<NavigationContainer>
			<ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
				<Container>
					<Navigator />
				</Container>
			</ThemeProvider>
		</NavigationContainer>
	);
};

export default App;
