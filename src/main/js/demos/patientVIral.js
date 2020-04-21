import { getColor } from '../utils/colors';
import { randomNum } from '../utils/demos';

const MONTHS = ['January', 'February', 'March', 'April'];

export const ViralLoad = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Vira Load',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),

        ],
        ...moreData,
      }
    ],
  };
  
};

console.log(ViralLoad);


export const userProgressTableData = [
  {

    name: 'Tom Suliman'

  },
  {
    name: 'Jenny Alex'
  },
  {
    name: 'Simi Adedeji'
  },
  {
    
    name: 'Christine Ada'
  }
  
];

export const Weight = (moreData = {}, moreData2 = {}) => {
    return {
      labels: MONTHS,
      datasets: [
        {
          label: 'Weight',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: [
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
  
          ],
          ...moreData,
        }, {
            label: 'Blood Presuire(BP)',
            backgroundColor: getColor('secondary'),
            borderColor: getColor('secondary'),
            borderWidth: 1,
            data: [
              randomNum(),
              randomNum(),
              randomNum(),
              randomNum(),
            ],
            ...moreData2,
          },
      ],
    };
    
  };

  
  