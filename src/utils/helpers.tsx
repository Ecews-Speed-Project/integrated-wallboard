export const handleSearch = (data: any[], searchStateId: any): any | undefined => {
    const result = data?.find(item => item.stateId === searchStateId);
    return result;
  };

  export const handleSearchArray = (data: any[], searchStateId: any): any[] => {
    const result = data?.filter(item => item.stateId === searchStateId);
    return result;
  };
  
