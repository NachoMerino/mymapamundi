$(document).ready(function() {
    var objCountries = [];
    $.getJSON('https://restcountries.eu/rest/v2/all', function(countries) {
        objCountries = countries;
        console.log(countries);
        $.each(countries, function(index, country) {

            $('#cmbCountry').append($('<option>', {
                value: index,
                text: country.name
            }));
        });
    });
    $('#cmbCountry').on('change', function() {
        var indexCountry = $(this).val();

        $('#mainCity').empty();
        $('#countryFlag').empty();
        $('#countryLanguages').empty();
        $('#population').empty();
        $.each(objCountries[indexCountry].languages, function(index, language) {
            $('#countryLanguages').append($('<li>', {
                'data-key': index,
                html: language.name + '<br>(' + language.nativeName + ')'
            }))
        })
        $('#population').append(`
          <p>${objCountries[indexCountry].population}</p>
          <p>${objCountries[indexCountry].area}</p>`)
        $('#mainCity').append(`
              <h1>${objCountries[indexCountry].capital}</h1>
            `)
        $('#countryFlag').append(`<img id="flag" src="${objCountries[indexCountry].flag}">`)

        initMap(objCountries[indexCountry].latlng[0], objCountries[indexCountry].latlng[1]);

        function initMap(latitude, longitude) {
            var mapCenter = { lat: latitude, lng: longitude };

            var zoomObj = 7;

            if (objCountries[indexCountry].area > 100000) {
                zoomObj = 6;
            } else if (objCountries[indexCountry].area > 250000) {
                zoomObj = 5;
            } else if (objCountries[indexCountry].area > 450000) {
                zoomObj = 4;
            } else if (objCountries[indexCountry].area < 5000) {
                zoomObj = 9;
            }


            console.log(zoomObj)
            var map = new google.maps.Map($('#map')[0], {
                center: mapCenter,
                zoom: zoomObj
            });
            var icon = {
                url: objCountries[indexCountry].flag, // url
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };




            var objMarker = new google.maps.Marker({
                position: mapCenter,
                map: map,
                icon: icon
            });

            var objInfoWindow = new google.maps.InfoWindow({
                content: `<h1>${objCountries[indexCountry].nativeName}</h1>`
            });

            objMarker.addListener('click', function() {
                objInfoWindow.open(map, objMarker);
            });

        }


    });







});