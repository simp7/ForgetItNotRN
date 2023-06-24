import React from "react";
import {
	Text,
	TextInput,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from "react-native";
import styled from "styled-components";

interface TextProps {
	bold?: boolean;
	size?: number;
}

const TextBase = styled(Text) <TextProps>`
	font-size: ${p => p.size ?? 17}px;
	font-weight: ${p => p.bold ? 'bold' : 'normal'};
	font-family: 'NanumGothic';
`;

export const CardText = styled(TextBase)`
	color: ${p => p.theme.colors.cardText};
`;

export const BlockText = styled(TextBase)`
	color: ${p => p.theme.colors.blockText};
`;

export const CardTextInput = styled(TextInput).attrs(p => ({
	placeholderTextColor: p.theme.colors.placeHolder,
})) <TextProps>`
	flex: 1;
	align-self: stretch;
	font-size: ${p => p.size ?? 17}px;
	font-family: 'NanumGothic';
	font-weight: ${p => p.bold ? 'bold' : 'normal'};
	padding: 10px 10px;
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

export const SpacerHeight = styled(View) <{ size: number }>`
	height: ${p => p.size}px;
`;

export const SpacerWidth = styled(View) <{ size: number }>`
	width: ${p => p.size}px;
`;

export const Spacer = styled(View)`
	flex: 1;
`;