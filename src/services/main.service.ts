import { getReportDates, postRetentionData, postSummaryData, postTrementTrendData, postViralloadAgeData, postViralloadData } from "./api/apiService";

export const retentionData = async (stateId: any, reportDate:any) => {
  const data: any = { state: stateId , reportDate :reportDate};
  console.log(data)
  try {
    const res = await postRetentionData(data);
    return res.data
  } catch (error) {
    console.log(error)
    // setResponse('Error occurred while posting data');
  }
}

export const treamenTtrend = async (stateId: any) => {
  const data: any = { state: stateId };
  try {
    const res = await postTrementTrendData(data);
    return res.data
  } catch (error) {
    console.log(error)
    // setResponse('Error occurred while posting data');
  }
}

export const viralloadData = async (stateId: any, reportDate:any) => {
  const data: any = { state: stateId , reportDate :reportDate};
  try {
    const res = await postViralloadData(data);
    return res.data
  } catch (error) {
    console.log(error)
    // setResponse('Error occurred while posting data');
  }
}

export const getReportDatesData = async (stateId: any) => {
  const data: any = { state: stateId };
  try {
    const res = await getReportDates(data);
    return res.data
  } catch (error) {
    console.log(error)
    // setResponse('Error occurred while posting data');
  }
}

export const viralloadAgeData = async (stateId: any) => {
  const data: any = { state: stateId };
  try {
    const res = await postViralloadAgeData(data);
    return res.data
  } catch (error) {
    console.log(error)
    // setResponse('Error occurred while posting data');
  }
}

export const summaryApiData = async (stateId: any) => {
  console.log(stateId)
  const data: any = { state: stateId };
  try {
    const res = await postSummaryData(data);
    return res.data
  } catch (error) {
    console.log(error)
    // setResponse('Error occurred while posting data');
  }
}