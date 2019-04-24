window.addEventListener('load',()=>{
    // lets define Longitude & tatitude
    let long;
    let lat;
    // DOM elements select
    let timezone = document.querySelector('#timezone');
    let temp = document.querySelector('#temp');
    let summarys = document.querySelector('#summary');
    let detail = document.querySelector('#detail');

    // check for location enable or not;
    if(navigator.geolocation){
        // get latitude and longitude
        navigator.geolocation.getCurrentPosition(position =>{
            // fill the value of latitude & longitude
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // i'm using localhost so i use Proxy fetch api
            let proxy = 'https://cors-anywhere.herokuapp.com/';
            // use darksky API for gets temprature details of current position
            let api = `${proxy}https://api.darksky.net/forecast/df0133328f51436a64048ab37949f66c/${lat},${long}`;
            // fecth api of darksky
            fetch(api)
            // return fetch data to Json 
            .then(response => {
                return response.json();
            })
            .then(data=>{
                console.log(data);
                const {temperature,summary,icon} = data.currently;
                summarys.innerHTML = summary;
                const celcius = (temperature-32)*(5/9);//f to c formula
                temp.textContent = temperature;
                timezone.textContent = data.timezone;
                // set Skycons
                setIcons(icon,document.querySelector('#icon'));
                // click event F to C
                document.querySelector('.temp').addEventListener('click',()=>{
                    if(detail.textContent=="F"){
                        detail.textContent="C";
                        temp.textContent=Math.floor(celcius);
                    }else {
                        detail.textContent="F";
                        temp.textContent=Math.floor(temperature);

                    }
                })
            })
        })
    }else{
        alert('Please Allow Location')
    }
    // function for diffrent canvas icons
    function setIcons(icon,iconID){
        let skycons = new Skycons({color:"White"});
        let currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})