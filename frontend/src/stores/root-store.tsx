import React, { createContext } from "react";
import useHeroContext from "../contexts/hero-context";
import { HeroStoreSchema } from "../models/hero-types";
import useSessionContext from "../contexts/session-context";
import { SessionStoreSchema } from "../models/session-types";
import useFetchContext from "../contexts/fetch-context";
import { FetchStoreSchema } from "../models/fetch-types";

export type RootStoreSchema = {
	heroStore: HeroStoreSchema;
	sessionStore: SessionStoreSchema;
	fetchStore: FetchStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }: any) => {
	const heroContext = useHeroContext();
	const sessionContext = useSessionContext();
	const fetchContext = useFetchContext();

	return (
		<RootStoreContext.Provider value={{ heroStore: heroContext, sessionStore: sessionContext, fetchStore: fetchContext }}>
			{children}
		</RootStoreContext.Provider>
	);
};

export default RootStore;
