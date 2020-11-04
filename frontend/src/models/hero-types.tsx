export type HeroStoreSchema = {
	heroes: string[];
	addHeroes: (n: number) => void;
	totalHeroes: number;
}
export type HeroModel = {
	id: string;
	firstName: string;
	lastName: string;
	house: string;
	knownAs: string;
};
// FIX: all any
export type HeroActionType2 = {
	/*non-async*/
	setErrorAction: (error: any) => void;
	setHeroAction: (hero: HeroModel) => void;

	/*computed or derived values*/
	totalHeroesAction: () => number;

	/*async*/
	getHeroesAction: () => Promise<void>;
	deleteHeroAction: (id: string) => Promise<void>;
	postHeroAction: (hero: HeroModel) => Promise<void>;
	putHeroAction: (hero: HeroModel) => Promise<void>;
	getHeroByIdAction: (id: string) => Promise<void>;
};

