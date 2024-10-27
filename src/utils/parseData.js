import Papa from 'papaparse';

export const evParseData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: function(results) {
            console.log('results data',results.data)
            resolve(results.data);
          },
          error: function(error) {
            reject(error);
          }
        });
      })
      .catch(error => reject(error));
  });
};
