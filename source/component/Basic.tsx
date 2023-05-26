import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

interface TextProps {
	bold?: boolean;
	size?: number;
}

export const PlainText = styled(Text) <TextProps>`
	font-size: ${p => p.size ?? 17}px;
	font-family: 'NanumGothic';
	font-weight: ${p => p.bold ? 'bold' : 'normal'};
	color: ${p => p.theme.colors.cardText};
`;

export const PlainTextInput = styled.TextInput.attrs(props => ({
	placeholderTextColor: props.theme.colors.placeHolder,
})) <TextProps>`
	font-size: ${p => p.size ?? 17}px;
	font-family: 'NanumGothic';
	font-weight: ${p => p.bold ? 'bold' : 'normal'};
	color: ${p => p.theme.colors.cardText};
`;

export const BasicButton = (props: TouchableOpacityProps) => {
	return (
		<TouchableOpacity
			hitSlop={{ bottom: 5, left: 7, right: 7, top: 5 }}
			{...props}
		/>
	);
};