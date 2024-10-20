export const handleSearch = (data: any[], searchStateId: any): any | undefined => {
    const result = data?.find(item => item.stateId === searchStateId);
    return result;
  };

  export const handleSearchArray = (data: any[], searchStateId: any): any[] => {
    const result = data?.filter(item => item.stateId === searchStateId);
    return result;
  };
  

  export const removeElemnts = (array:[]) =>{
    return array.filter((item: string) => item !== "total")
  }

  export const removeLastElemnts = (array:[]) =>{
    return array.filter((item: string) => item !==  array[array.length - 1])
  }

  export const getLastElemnts = (array:[]) =>{
    return array[array.length - 1]
  }
