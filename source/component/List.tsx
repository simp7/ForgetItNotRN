import { Slider } from "@miblanchard/react-native-slider";
import React, { forwardRef, useState } from "react";
import {
	FlatList,
	FlatListProps,
	TextInput,
	TextInputProps,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import styled, { useTheme } from "styled-components";

import { IconCheck } from "../asset/icon";
import { SCREEN_WIDTH } from "../constant";
import { BasicButton, BlockText, CardTextInput, TagText } from "./Basic";
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
	margin-bottom: 20px;
`;

interface ItemProps {
	title: string;
}

interface StandardListItemProps extends ItemProps {
	content?: string;
	onPress?: () => void;
}

export const StandardListItem = (props: StandardListItemProps) => {
	const { title, content, onPress } = props;
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<StandardContainer>
				<BlockText size={20} bold>
					{title}
				</BlockText>
				<BlockText size={20} bold>
					{content}
				</BlockText>
			</StandardContainer>
		</TouchableWithoutFeedback>
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
			<BlockText size={20} bold>
				{title}
			</BlockText>
			<Switch value={value} onValueChange={(value) => setValue(!value)} />
		</StandardContainer>
	);
};

const TargetRateContainer = styled(ContainerBase)`
	height: 120px;
	padding-top: 27.5px;
	padding-bottom: 12px;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const SpaceAround = styled(View)`
	flex-direction: row;
	justify-content: space-between;
	padding: 0 20px;
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
				<BlockText size={20} bold>{'목표 성취율'}</BlockText>
				<BlockText size={20} bold>{`${tmp}%`}</BlockText>
			</SpaceAround>
			<SpaceAround>
				<Slider
					value={tmp}
					onValueChange={(a) => {
						setTmp(a[0]);
					}}
					minimumValue={60}
					maximumValue={95}
					step={5}
					thumbTintColor={colors.white}
					maximumTrackTintColor={colors.gray}
					minimumTrackTintColor={colors.subTint}
					trackStyle={{ width: SCREEN_WIDTH - 140, height: 9, borderRadius: 4 }}
					thumbStyle={{ width: 30, height: 30, borderRadius: 15 }}
				/>
				<BasicButton onPress={() => setRate(tmp)} disabled={disabled} style={{ paddingRight: 5 }}>
					<IconCheck tint={disabled ? colors.gray : colors.subTint} />
				</BasicButton>
			</SpaceAround>
		</TargetRateContainer>
	);
};

const TagBox = styled(View) <{ selected?: boolean }>`
	background-color: ${p => p.theme.colors.tint};
	padding: 0 12px;
	height: 30px;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	margin: 7.5px;
	border-color: ${p => p.theme.colors.subTint};
	border-width: ${p => p.selected ? '2px' : 0};
`;

interface TagProps {
	tag: string;
	selected?: boolean;
}

export const Tag = (props: TagProps) => {
	const { tag, selected } = props;
	return (
		<TagBox selected={selected}>
			<TagText size={16}>{tag}</TagText>
		</TagBox>
	);
};

type TagListProps = Omit<FlatListProps<string>, 'renderItem'>

export const TagList = (props: TagListProps) => {
	return (
		<FlatList
			contentContainerStyle={{
				marginVertical: 20,
			}}
			renderItem={(props) => <Tag tag={props.item} key={props.index} />}
			horizontal
			{...props}
		/>
	);
};

const TagTextInput = styled(CardTextInput)`
	color: ${p => p.theme.colors.white};
`;

export const TagInput = forwardRef<TextInput, TextInputProps>((props, ref) => {
	return (
		<TagBox>
			<TagTextInput
				{...props}
				ref={ref}
				bold
				hide={false}
			/>
		</TagBox>
	);
});