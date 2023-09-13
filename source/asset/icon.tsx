import React from "react";
import { View } from "react-native";
import Svg, {
	Circle,
	ClipPath,
	Defs,
	G,
	Path,
} from "react-native-svg";
import { useTheme } from "styled-components";

import { CardText, IconText } from "../component/Basic";
import { addMode } from "../model/addMode";

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

export const IconCheck = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 30, tint = colors.white } = props;
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 30 30"
			fill="none"
			{...props}
		>
			<G clipPath="url(#oy3ae4sy3a)">
				<Path
					d="M29.303 4.903a2.38 2.38 0 0 0-3.365 0L10.794 20.048l-6.732-6.73a2.38 2.38 0 1 0-3.365 3.365l8.413 8.413a2.372 2.372 0 0 0 1.683.698c.609 0 1.219-.233 1.683-.698L29.303 8.27a2.38 2.38 0 0 0 0-3.366z"
					fill={tint}
				/>
			</G>
			<Defs>
				<ClipPath id="oy3ae4sy3a">
					<Path fill={tint} d="M0 0h30v30H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export const CameraIcon = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 50, tint = colors.white } = props;
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 50 50"
			fill={'none'}
		>
			<G clipPath="url(#jbfuqitqsa)">
				<Path
					d="M33.064 28.374c0 4.447-3.617 8.064-8.064 8.064s-8.062-3.617-8.062-8.064S20.553 20.31 25 20.31c4.447 0 8.064 3.619 8.064 8.064zM50 16.924v22.903a5.528 5.528 0 0 1-5.529 5.529H5.53A5.529 5.529 0 0 1 0 39.827V16.924a5.529 5.529 0 0 1 5.529-5.53h6.8V9.483a4.838 4.838 0 0 1 4.838-4.838h15.666a4.838 4.838 0 0 1 4.838 4.838v1.912h6.8A5.531 5.531 0 0 1 50 16.924zm-12.79 11.45c0-6.733-5.477-12.21-12.21-12.21-6.731 0-12.209 5.477-12.209 12.21 0 6.733 5.478 12.21 12.209 12.21 6.733 0 12.21-5.477 12.21-12.21z"
					fill={tint}
				/>
			</G>
			<Defs>
				<ClipPath id="jbfuqitqsa">
					<Path fill={tint} d="M0 0h50v50H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export const GalleryIcon = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 50, tint = colors.white } = props;
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 50 50"
			fill={'none'}
		>
			<G clipPath="url(#fn0kwny9ba)" fill={tint}>
				<Path d="M25.904 39.536a6.325 6.325 0 0 1-3.97-1.48l-7.332-6.458a3.229 3.229 0 0 0-4.171-.202L.004 39.065v4.978a2.422 2.422 0 0 0 2.489 2.556h36.932c1.48 0 2.96-1.076 2.96-2.556v-13.05L29.133 38.66a6.122 6.122 0 0 1-3.23.875zM25.366 26.485a2.96 2.96 0 1 0 0-5.92 2.96 2.96 0 0 0 0 5.92z" />
				<Path d="M49.382 8.658a2.49 2.49 0 0 0-1.817-1.01L10.902 3.412a3.094 3.094 0 0 0-2.018.538 3.094 3.094 0 0 0-1.01 1.749l-.605 5.247h32.157a5.785 5.785 0 0 1 5.65 5.584v23.747c0-.135.606-.27.875-.538a2.288 2.288 0 0 0 .874-1.817l3.162-27.312a2.625 2.625 0 0 0-.605-1.951z" />
				<Path d="M39.425 13.636H2.493c-1.48 0-2.49 1.413-2.49 2.893V35.7l8.88-6.458a5.92 5.92 0 0 1 7.468.336l7.4 6.459a3.43 3.43 0 0 0 3.969.336l14.665-8.544V16.53a3.094 3.094 0 0 0-2.96-2.893zm-14.06 15.54a5.65 5.65 0 1 1 0-11.302 5.65 5.65 0 0 1 0 11.302z" />
			</G>
			<Defs>
				<ClipPath id="fn0kwny9ba">
					<Path fill={tint} d="M0 0h50v50H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export const IconX = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 40, tint = colors.white } = props;
	return (
		<Svg
			width={size}
			height={size}
			x={0}
			y={0}
			viewBox="0 0 320.591 320.591"
		>
			<G>
				<Path
					d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
					fill={tint}
					opacity={1}
				/>
				<Path
					d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
					fill={tint}
					opacity={1}
				/>
			</G>
		</Svg>
	);
};

interface SwapProps extends IconProps {
	mode: addMode;
}

export const IconSwap = (props: SwapProps) => {
	const { colors } = useTheme();
	const { size = 40, tint = colors.tint, mode } = props;
	return (
		<View style={{ alignItems: 'center', justifyContent: 'center' }}>
			<Svg
				id="Capa_1"
				x="0px"
				y="0px"
				viewBox="0 0 513.806 513.806"
				width={size}
				height={size}
			>
				<G>
					<Path d="M66.074,228.731C81.577,123.379,179.549,50.542,284.901,66.045c35.944,5.289,69.662,20.626,97.27,44.244l-24.853,24.853   c-8.33,8.332-8.328,21.84,0.005,30.17c3.999,3.998,9.423,6.245,15.078,6.246h97.835c11.782,0,21.333-9.551,21.333-21.333V52.39   c-0.003-11.782-9.556-21.331-21.338-21.329c-5.655,0.001-11.079,2.248-15.078,6.246L427.418,65.04   C321.658-29.235,159.497-19.925,65.222,85.835c-33.399,37.467-55.073,83.909-62.337,133.573   c-2.864,17.607,9.087,34.202,26.693,37.066c1.586,0.258,3.188,0.397,4.795,0.417C50.481,256.717,64.002,244.706,66.074,228.731z" fill={tint} />
					<Path d="M479.429,256.891c-16.108,0.174-29.629,12.185-31.701,28.16C432.225,390.403,334.253,463.24,228.901,447.738   c-35.944-5.289-69.662-20.626-97.27-44.244l24.853-24.853c8.33-8.332,8.328-21.84-0.005-30.17   c-3.999-3.998-9.423-6.245-15.078-6.246H43.568c-11.782,0-21.333,9.551-21.333,21.333v97.835   c0.003,11.782,9.556,21.331,21.338,21.329c5.655-0.001,11.079-2.248,15.078-6.246l27.733-27.733   c105.735,94.285,267.884,85.004,362.17-20.732c33.417-37.475,55.101-83.933,62.363-133.615   c2.876-17.605-9.064-34.208-26.668-37.084C482.655,257.051,481.044,256.91,479.429,256.891z" fill={tint} />
				</G>
			</Svg>
			<IconText
				bold
				size={17}
				style={{ position: 'absolute' }}
			>
				{mode === 'QUESTION' ? 'A' : 'Q'}
			</IconText>
		</View>
	);
};

const Icon = (props: IconProps) => {
	const { colors } = useTheme();
	const { size = 40, tint = colors.tint } = props;

};