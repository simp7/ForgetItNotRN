import React from "react";
import FastImage from "react-native-fast-image";
import styled from "styled-components";

enum Images {
	trash = require('./images/trash.png'),
	x = require('./images/x.png'),
}

interface ImageProps {
	size?: number;
}

const Img = styled(FastImage) <ImageProps>`
	width: ${p => p.size}px;
	height: ${p => p.size}px;
`;

export const IconTrash = (props: ImageProps) => {
	const { size = 32 } = props;
	return <Img source={Images.trash} size={size} />;
};
