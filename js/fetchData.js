updateValues();

setInterval(updateValues,5000);

function updateValues() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "http://localhost:3000/sensors/");
    // xhr.open('GET', "https://safe-wave-06143.herokuapp.com/sensors/");
    
    xhr.responseType = 'json';
    xhr.onload = function(e) {
    if (this.status == 200) 
    {
        let responseObj1 = this.response[0];
        console.log(responseObj1)
        document.getElementById('sensor1').innerHTML = responseObj1.sensor_param_1

        let responseObj2 = this.response[1];
        document.getElementById('sensor2').innerHTML = responseObj2.sensor_param_1

        let responseObj3 = this.response[2];
        document.getElementById('sensor3').innerHTML = responseObj3.description

        // let responseObj4 = this.response[3];
        // document.getElementById('sensor4').innerHTML = responseObj4.sensor_param_1

        // let responseObj5 = this.response[4];
        // document.getElementById('sensor5').innerHTML = responseObj5.sensor_param_1

        // let responseObj6 = this.response[5];
        // document.getElementById('sensor6').innerHTML = responseObj6.sensor_param_1

    
        let dt = new Date();
		document.getElementById("lastUpdate").innerHTML = "Ultimul update: " + dt.toLocaleString();
    }
};
xhr.send();
}