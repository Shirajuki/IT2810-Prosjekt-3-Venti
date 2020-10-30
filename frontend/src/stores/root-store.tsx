import React, { createContext } from "react";
import useHeroContext from "../contexts/hero-context";
import { HeroStoreSchema } from "../stores/hero-types";

export type RootStoreSchema = {
	heroStore: HeroStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }: any) => {
	const heroContext = useHeroContext();

	return (
		<RootStoreContext.Provider value={{ heroStore: heroContext }}>
			{children}
		</RootStoreContext.Provider>
	);
};

export default RootStore;
