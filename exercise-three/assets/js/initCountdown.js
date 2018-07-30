(function(){

  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  // Find the start date
  let startDate = new Date();
  startDate.setTime(startDate.getTime() + (9 * day) + (16 * hour) + (27 * minute));

  // Set the date that we want to start
  let countDown = startDate.getTime();

  // update count down every second
  let upate = setInterval(function() {

    // Get todays date and time
    let now = new Date().getTime(),
    diference = countDown - now;

    // Calculations for days, hours and minutes
    let days = Math.floor(diference / (day)),
        hours = Math.floor((diference % (day)) / (hour)),
        minutes = Math.floor((diference % (hour)) / (minute));

    // Update values of days, hours and minutes on markup
    document.getElementById('days').innerText = String(days).length >= 2 ? days : "0" + days,
    document.getElementById('hours').innerText = String(hours).length >= 2 ? hours : "0" + hours,
    document.getElementById('minutes').innerText = String(minutes).length >= 2 ? minutes : "0" + minutes;

    // Condition to validate if the countDown ends
    if(diference < 0){
      clearInterval(upate);
      document.getElementById('expired').innerText = "END";
    }
  }, second);

}());
