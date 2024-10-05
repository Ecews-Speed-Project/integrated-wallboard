
export interface DiseaseData {
	suspectedCases: number;
	confirmedCases: number;
	evaluatedCases: number;
	rdtRapidDiagnostictestPositive: number; // Adding rdtRapidDiagnostictestPositive
	cultured: number; // Adding cultured
  }
  
  export interface LGAData {
	state: string;
	lga: string;
	choleraCascade: DiseaseData;
	lassa: DiseaseData;
	measles: DiseaseData;
	yellowFever: DiseaseData;
	monkeyPox: DiseaseData;
	covid19: DiseaseData;
	diphtheria: DiseaseData;
  }
  
  export interface Totals {
	cholera: DiseaseData;
	lassa: DiseaseData;
	measles: DiseaseData;
	yellowFever: DiseaseData;
	monkeyPox: DiseaseData;
	covid19: DiseaseData;
	diphtheria: DiseaseData;
  }
  
  export interface ConfirmedCasesByLGA {
	[lga: string]: number; // Store confirmed cases by LGA
  }

