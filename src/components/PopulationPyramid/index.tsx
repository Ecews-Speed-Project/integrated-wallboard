

export const PopulationPyramid = () => {
  // Function to generate random number within a range
  const randomInRange = (min:any, max:any) => Math.floor(Math.random() * (max - min + 1) + min);

  // Generate random data
  const generateData = () => {
    let femaleBase = randomInRange(5, 8);
    let maleBase = randomInRange(5, 8);
    
    return [
      { female: randomInRange(1, 2), male: randomInRange(1, 2), range: '80+' },
      { female: randomInRange(2, 3), male: randomInRange(2, 3), range: '75-79' },
      { female: randomInRange(3, 4), male: randomInRange(3, 4), range: '70-74' },
      { female: randomInRange(4, 5), male: randomInRange(4, 5), range: '65-69' },
      { female: randomInRange(5, 6), male: randomInRange(5, 6), range: '60-64' },
      { female: randomInRange(6, 7), male: randomInRange(6, 7), range: '55-59' },
      { female: randomInRange(7, 8), male: randomInRange(7, 8), range: '50-54' },
      { female: femaleBase, male: maleBase, range: '45-49' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '40-45' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '35-40' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '30-34' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '25-29' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '20-24' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '15-19' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '10-14' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '5-9' },
      { female: femaleBase + randomInRange(-1, 1), male: maleBase + randomInRange(-1, 1), range: '0-4' }
    ];
  };

  const items = generateData();
  const totalPopulation = items.reduce((sum, item) => sum + item.female + item.male, 0);

  // Convert to percentages
  const percentageItems = items.map(item => ({
    ...item,
    femalePercentage: (item.female / totalPopulation * 100).toFixed(1),
    malePercentage: (item.male / totalPopulation * 100).toFixed(1)
  }));

  const maxPercentage = Math.max(...percentageItems.flatMap(item => [parseFloat(item.femalePercentage), parseFloat(item.malePercentage)]));

  return (
    <div className="font-serif p-4">
      <div className="text-center text-xl mb-8">Population Distribution (%)</div>
      
      {/* Labels row */}
      <div className="flex items-center h-7 mb-2">
        <span className="w-16" />
        <div className="flex-1 px-2 text-center font-semibold">Female</div>
        <span className="w-28" />
        <div className="flex-1 px-2 text-center font-semibold">Male</div>
        <span className="w-16" />
      </div>

      {/* Chart rows */}
      <div className="flex flex-col gap-1">
        {percentageItems.map((item, index) => (
          <div key={index} className="flex items-center h-7">
            <span className="w-16 text-right">{item.femalePercentage}%</span>
            <div className="flex-1 px-2 flex justify-end">
              <div 
                className="bg-gold-400 h-5" 
                style={{ width: `${(parseFloat(item.femalePercentage) / maxPercentage) * 100}%` }}
              />
            </div>
            <span className="w-28 text-center text-sm">{item.range}</span>
            <div className="flex-1 px-2">
              <div 
                className="bg-gold-green-400 h-5" 
                style={{ width: `${(parseFloat(item.malePercentage) / maxPercentage) * 100}%` }}
              />
            </div>
            <span className="w-16 text-left">{item.malePercentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopulationPyramid;