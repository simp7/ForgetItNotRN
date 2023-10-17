import { atom, DefaultValue, selector } from "recoil";

import { loadTags, saveTags } from "../util/storage";

enum key {
	object = 'Tag',
	add = 'addTag',
	delete = 'deleteTag',
}

export const rstTags = atom<string[]>({
	key: key.object,
	default: [],
	effects: [({ setSelf, onSet }) => {
		loadTags().then(value => {
			if (value !== null) {
				setSelf(value);
			}
		});
		onSet((newValue) => {
			saveTags(newValue);
			console.log(key.object, newValue);
		});
	}],
});

export const rstAddTag = selector<string>({
	key: key.add,
	get: () => '',
	set: ({ get, set }, newValue) => {
		if (!(newValue instanceof DefaultValue) && get(rstTags).every(v => v !== newValue)) {
			set(rstTags, [...get(rstTags), newValue]);
		}
	},
});

export const rstDeleteTag = selector<string>({
	key: key.delete,
	get: () => '',
	set: ({ get, set }, newValue) => {
		if (!(newValue instanceof DefaultValue)) {
			const tmp: string[] = JSON.parse(JSON.stringify(get(rstTags)));
			const index = tmp.findIndex((value) => value === newValue);
			tmp.splice(index);
			set(rstTags, tmp);
		}
	},
});