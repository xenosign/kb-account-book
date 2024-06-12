export const data = {
  labels: ['식비', '교통비', '적금', '쇼핑', '이체'],
  datasets: [
    {
      data: [10, 10, 20, 30, 30],
      backgroundColor: ['#FFE70E', '#0DC9B9', '#41B6E8', '#E982AD', '#9771EF'],
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
};
