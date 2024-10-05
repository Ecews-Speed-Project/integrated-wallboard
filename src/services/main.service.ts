import { postRetentionData, postSummaryData, postViralloadAgeData, postViralloadData } from "./api/apiService";

export const retentionData = async (stateId: any) => {
  const data: any = { state: stateId };
  try {
    const res = await postRetentionData(data);
    return res.data
  } catch (error) {
    console.log(error)
    // setResponse('Error occurred while posting data');
  }
}

export const viralloadData = async (stateId: any) => {
  const data: any = { state: stateId };
  try {
    const res = await postViralloadData(data);
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