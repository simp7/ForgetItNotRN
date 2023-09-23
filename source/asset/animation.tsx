import LottieView, { LottieViewProps } from "lottie-react-native";
import React, { forwardRef } from "react";
import { View } from "react-native";
import styled from "styled-components";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constant";

const CompleteReviewContainer = styled(View)`
	position: absolute;
	width: ${SCREEN_WIDTH}px;
	height: ${SCREEN_HEIGHT}px;
	align-items: center;
	justify-content: center;
`;

const CompleteReview = styled(LottieView)`
	width: ${SCREEN_HEIGHT}px;
	height: ${SCREEN_HEIGHT}px;
`;

export const CompleteReviewAnimation = forwardRef<LottieView, Omit<LottieViewProps, 'source'>>((props, ref) => {
	return (
		<CompleteReviewContainer pointerEvents="none">
			<CompleteReview {...props} ref={ref} source={require("./lottie/congratuation.json")} />
		</CompleteReviewContainer>
	);
});