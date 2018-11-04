function renderUserCityCountBubbleChart(id) {
  $.ajax({
    type: "GET",
    url: '/api/user-city',
    success: function (result) {
      console.log(result);
      var options = {
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'John',
              data: [
                {
                  x: 3,
                  y: 7,
                  r: 10
                }
              ],
              backgroundColor:"#ff6384",
              hoverBackgroundColor: "#ff6384"
            }
          ]
        }
      };

      var ctx = document.getElementById(id).getContext('2d');
      new Chart(ctx, options);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Unable to get data from API. Please try again.");
    }
  });

}

// function renderUserCityCountBubbleChart() {
//   $.ajax({
//     type: "GET",
//     url: '/constants/',
//     data: {
//       table: "Tbl_5_1_Eff",
//       Compliance: current_compliance_level,
//       Type: chiller_type
//     },
//     success: function (result) {
//     },
//     error: function (XMLHttpRequest, textStatus, errorThrown) {
//       alert("Unable to get data from API. Please try again.");
//     }
//   });
//
// }

