import { atom, DefaultValue, selector } from "recoil";

import { loadTags, saveTags } from "../util/storage";

let Taglist = new Set<string>();

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
				console.log(key.object, value);
				setSelf(value);
				Taglist = new Set<string>(value);
			}
		});
		onSet((newValue) => {
			saveTags(newValue);
			console.log(key.object, newValue);
		});
	}],
});

export const addTag = selector<string>({
	key: key.add,
	get: () => '',
	set: ({ get, set }, newValue) => {
		if (!(newValue instanceof DefaultValue) && !Taglist.has(newValue)) {
			set(rstTags, [...get(rstTags), newValue]);
		}
	},
});

export const deleteTag = selector<string>({
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