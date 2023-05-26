import * as React from "react";
import Svg, {
	Circle,
	ClipPath,
	Defs,
	G,
	Path,
} from "react-native-svg";
import { useTheme } from "styled-components";

interface IconProps {
	size?: number;
	tint?: string;
}

export const IconCog = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 40, tint = colors.tint } = props;
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 40 40"
			fill="none"
		>
			<Path
				d="m39.624 25.26-4.347-3.312c.098-.644.143-1.296.143-1.94a16.17 16.17 0 0 0-.143-1.973l4.347-3.313a.986.986 0 0 0 .232-1.287l-4.115-6.913c-.259-.426-.794-.6-1.258-.426l-5.106 1.991a15.14 15.14 0 0 0-3.472-1.974L25.137.826A1.053 1.053 0 0 0 24.11 0h-8.22a1.051 1.051 0 0 0-1.027.86l-.768 5.288a15.749 15.749 0 0 0-3.463 1.974l-5.115-2c-.473-.174-1 .008-1.258.426L.144 13.46a.996.996 0 0 0 .232 1.287l4.347 3.313A12.887 12.887 0 0 0 4.58 20c.01.66.054 1.322.143 1.974L.376 25.287a.986.986 0 0 0-.232 1.287l4.115 6.913c.259.426.794.6 1.258.426l5.115-2a15.082 15.082 0 0 0 3.463 1.974l.768 5.287c.098.478.527.817 1.027.826h8.22a1.051 1.051 0 0 0 1.027-.86l.768-5.288a15.751 15.751 0 0 0 3.463-1.974l5.115 2c.473.174 1-.008 1.258-.426l4.115-6.913a.984.984 0 0 0-.232-1.278zm-19.62 1.696c-3.945 0-7.14-3.113-7.14-6.956 0-3.843 3.195-6.957 7.14-6.957 3.937.01 7.132 3.122 7.141 6.957 0 3.843-3.195 6.956-7.14 6.956z"
				fill={tint}
			/>
		</Svg>
	);
};

export const IconChart = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 40, tint = colors.tint } = props;
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 40 40"
			fill="none"
		>
			<Path
				d="M11.667 21.667v15A1.666 1.666 0 0 1 10 38.333H3.333a1.667 1.667 0 0 1-1.666-1.666v-15A1.667 1.667 0 0 1 3.333 20H10a1.667 1.667 0 0 1 1.667 1.667zm11.666-20h-6.666A1.667 1.667 0 0 0 15 3.333v33.334a1.667 1.667 0 0 0 1.667 1.666h6.666A1.666 1.666 0 0 0 25 36.667V3.333a1.667 1.667 0 0 0-1.667-1.666zM36.667 10H30a1.667 1.667 0 0 0-1.667 1.667v25A1.666 1.666 0 0 0 30 38.333h6.667a1.667 1.667 0 0 0 1.666-1.666v-25A1.667 1.667 0 0 0 36.667 10z"
				fill={tint}
			/>
		</Svg>
	);
};

export const IconBack = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 40, tint = colors.tint } = props;
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 40 40"
			fill="none"
		>
			<G clipPath="url(#zyy5unjroa)">
				<Path
					d="M38.827 37.49c-.567 0-1.06-.41-1.155-.98-.845-4.937-5.627-13.555-17.755-14.059v6.335a1.171 1.171 0 0 1-1.853.954L.49 17.188a1.173 1.173 0 0 1 0-1.907L18.064 2.729a1.172 1.172 0 0 1 1.853.953v6.431C27.414 10.861 40 16.273 40 36.318a1.172 1.172 0 0 1-1.173 1.172z"
					fill={tint}
				/>
			</G>
		</Svg>
	);
};

export const IconAdd = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 60, tint = colors.tint } = props;
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 60 60"
			fill="none"
		>
			<Circle
				cx={size / 2}
				cy={size / 2}
				r={size / 2}
				fill={tint}
			/>
			<Path
				d="M27.5 28h-13a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h13a.5.5 0 0 1 .5.5v13a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 1 .5-.5h13a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v13a.5.5 0 0 1-.5.5z"
				fill={colors.background}
			/>
		</Svg>
	);
};

const Icon = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 40, tint = colors.tint } = props;

};