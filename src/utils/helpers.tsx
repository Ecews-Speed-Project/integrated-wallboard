import { FunctionComponent } from "react";

export const handleSearch = (data: any[], searchStateId: any): any | undefined => {
	const result = data?.find(item => item.stateId === searchStateId);
	return result;
};

export const handleSearchArray = (data: any[], searchStateId: any): any[] => {
	const result = data?.filter(item => item.stateId === searchStateId);
	return result;
};


export const removeElemnts = (array: []) => {
	return array.filter((item: string) => item !== "total")
}

export const removeLastElemnts = (array: []) => {
	return array.filter((item: string) => item !== array[array.length - 1])
}

export const getLastElemnts = (array: []) => {
	return array[array.length - 1]
}



export interface StateData {
	StateName: string;
	ndr_tx_curr: number;
	ndr_captured: number;
	ndr_unique: number;
	ndr_match_outcome: number;
}


export interface Totals {
	ndr_tx_curr: number;
	ndr_captured: number;
	ndr_unique: number;
	ndr_match_outcome: number;
}

export const statesData: StateData[] = [
	{
		"StateName": "Delta",
		"ndr_tx_curr": 51388,
		"ndr_captured": 51229,
		"ndr_unique": 50529,
		"ndr_match_outcome": 45945
	},
	{
		"StateName": "Ekiti",
		"ndr_tx_curr": 11480,
		"ndr_captured": 11414,
		"ndr_unique": 10975,
		"ndr_match_outcome": 9863
	},
	{
		"StateName": "Osun",
		"ndr_tx_curr": 24490,
		"ndr_captured": 24391,
		"ndr_unique": 23296,
		"ndr_match_outcome": 22081
	}
];



export const getStateDetails = (stateName?: string): StateData | Totals => {
	if (stateName) {
		// Find the state details from the JSON data
		const stateDetails: StateData = statesData.find(state => state.StateName.toLowerCase() === stateName.toLowerCase()) as StateData;
		return stateDetails;
	} else {
		// Calculate the total sum for each column
		const totals: Totals = statesData.reduce((acc, state) => {
			acc.ndr_tx_curr += state.ndr_tx_curr;
			acc.ndr_captured += state.ndr_captured;
			acc.ndr_unique += state.ndr_unique;
			acc.ndr_match_outcome += state.ndr_match_outcome;
			return acc;
		}, {
			ndr_tx_curr: 0,
			ndr_captured: 0,
			ndr_unique: 0,
			ndr_match_outcome: 0
		});
		return totals
	}
};


export interface State {
	StateName: string;
	stateId: number;
}

const states: State[] = [
	{ StateName: "Delta", stateId: 1 },
	{ StateName: "Ekiti", stateId: 2 },
	{ StateName: "Osun", stateId: 3 }
];

export const getStateById = (id: number): State | undefined => {
	return states.find(state => state.stateId === id) as State;
};


export const formatTime = (date: Date): string => {
	return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const formatDate = (date: Date): string => {
	return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
};


export const Shimmer: FunctionComponent = () => (
	<div className="shimmer" style={{ height: '100px', backgroundColor: '#f6f7f8', backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)', backgroundRepeat: 'no-repeat', animation: 'shimmer 1.5s infinite' }}>
	  <style>
		{`
		  @keyframes shimmer {
			0% { background-position: -500px 0; }
			100% { background-position: 500px 0; }
		  }
		`}
	  </style>
	</div>
  );


  // utils.ts
export const formatNumber = (num: number): string => {
	return new Intl.NumberFormat('en-US').format(num);
};

export const calculatePercentageChange = (current: number, previous: number): number => {
	return ((current - previous) / previous) * 100;
};