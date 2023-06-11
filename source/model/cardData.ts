export enum InputType {
	Text = 'TEXT',
	Image = 'IMAGE',
}

export interface Data {
	data: string;
	type: InputType;
}

export interface CardData {
	question: Data;
	answer?: Data;
	repeat: number;
	lastReviewed: Date;
}