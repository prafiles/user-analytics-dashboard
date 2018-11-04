/**
 * Renders the bubble chart on the specified id
 * @param id
 */
function renderUserCityCountBubbleChart(id) {
  $.ajax({
    type: "GET",
    url: '/api/user-city',
    success: function (result) {
      let datasets = [];

      //We need special data format for axes since chartjs requires us to convert to numbers
      let records = result.records;
      let cities = result.cities;
      let users = result.users;
      for (let i = 0; i < records.length; i++) {
        datasets.push({
          x: records[i].user,
          y: records[i].city,
          r: records[i].count * 10,
        })
      }
      let options = {
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'User City Counts',
              data: datasets,
              backgroundColor: getRandomColor(),
              hoverBackgroundColor: getRandomColor()
            }
          ]
        },
        options: {
          scales: { //Then we back convert axes to create the required charts
            yAxes: [{
              ticks: {
                callback: function (value, index, values) {
                  return cities[value];
                }
              }
            }],
            xAxes: [{
              ticks: {
                callback: function (value, index, values) {
                  return users[value];
                }
              }
            }]
          }
        }

      };

      let ctx = document.getElementById(id).getContext('2d');
      new Chart(ctx, options);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Unable to get data from API. Please try again.");
    }
  });
}

/**
 * Render the aggregate donut chart
 * @param id HTML Canvas element id
 * @param key API parameter for aggregation
 */
function renderAggregateChart(id, key) {
  $.ajax({
    type: "GET",
    url: '/api/' + key,
    success: function (result) {
      let datasets = [];
      let labels = [];
      let colors = [];
      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          labels.push(key);
          datasets.push(result[i][key]);
          colors.push(getRandomColor());
        }
      }
      let options = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: datasets,
            backgroundColor: colors
          }],
          labels: labels
        },
      };
      var ctx = document.getElementById(id).getContext('2d');
      new Chart(ctx, options);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Unable to get data from API. Please try again.");
    }
  });
}


/**
 * Generates random color each time it is called. Used for choosing colors while rendering.
 * Sourced from: https://stackoverflow.com/questions/40537024/chart-js-pie-chart-background-colors-is-there-any-way-to-generate-them-randomly
 * @returns {string}
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}