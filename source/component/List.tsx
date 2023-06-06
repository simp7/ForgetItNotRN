import React, { useState } from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components";

import { IconCheck } from "../asset/icon";
import { SCREEN_WIDTH } from "../model/constant";
import { BasicButton, BlockText } from "./Basic";
import { Switch } from "./Switch";

const ContainerBase = styled(View) <{ height?: number }>`
	background-color: ${p => p.theme.colors.tint};
	width: ${SCREEN_WIDTH - 30}px;
	border-radius: 10px;
`;

const StandardContainer = styled(ContainerBase)`
	height: 80px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
`;

interface ItemProps {
	title: string;
}

interface StandardListItemProps extends ItemProps {
	content: string;
}

export const StandardListItem = (props: StandardListItemProps) => {
	const { title, content } = props;
	return (
		<StandardContainer>
			<BlockText size={20}>
				{title}
			</BlockText>
			<BlockText size={20}>
				{content}
			</BlockText>
		</StandardContainer>
	);
};

interface SwitchListItemProps extends ItemProps {
	value: boolean;
	setValue: (value: boolean) => void;
}

export const SwitchListItem = (props: SwitchListItemProps) => {
	const { title, value, setValue } = props;
	return (
		<StandardContainer>
			<BlockText size={20}>
				{title}
			</BlockText>
			<Switch value={value} onValueChange={setValue} />
		</StandardContainer>
	);
};

const TargetRateContainer = styled(ContainerBase)`
	height: 120px;
`;

const SpaceAround = styled(View)`
	flex-direction: row;
	justify-content: space-between;
`;

interface TargetRateListItemProps {
	rate: number;
	setRate: (value: number) => void;
}

export const TargetRateListItem = (props: TargetRateListItemProps) => {
	const { rate, setRate } = props;
	const [tmp, setTmp] = useState<number>(rate);

	const { colors } = useTheme();
	const disabled = tmp === rate;

	return (
		<TargetRateContainer>
			<SpaceAround>
				<BlockText>{'목표 성취율'}</BlockText>
				<BlockText>{`${tmp}%`}</BlockText>
			</SpaceAround>
			<SpaceAround>
				<BasicButton onPress={() => setRate(tmp)} disabled={disabled}>
					<IconCheck tint={disabled ? colors.gray : colors.white} />
				</BasicButton>
			</SpaceAround>
		</TargetRateContainer>
	);
};