import React, { createContext } from "react";
import useSessionContext from "../contexts/session-context";
import { SessionStoreSchema } from "../models/session-types";
import useFetchContext from "../contexts/fetch-context";
import { FetchStoreSchema } from "../models/fetch-types";
import useReviewContext from "../contexts/review-context";
import { ReviewStoreSchema } from "../models/review-types";

export type RootStoreSchema = {
	sessionStore: SessionStoreSchema;
	fetchStore: FetchStoreSchema;
	reviewStore: ReviewStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }: any) => {
	const sessionContext = useSessionContext();
	const fetchContext = useFetchContext();
	const reviewContext = useReviewContext();

	return (
		<RootStoreContext.Provider value={{ sessionStore: sessionContext, fetchStore: fetchContext, reviewStore: reviewContext }}>
			{children}
		</RootStoreContext.Provider>
	);
};

export default RootStore;
