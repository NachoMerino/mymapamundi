    var objCountries = [];
    var objArea = [];;
    $(document).ready(function() {

        $.getJSON('https://restcountries.eu/rest/v2/all', function(countries) {
            objCountries = countries;
            newObjCountries = countries;
            console.log(objCountries);
            $.each(countries, function(index, country) {

                $('#cmbCountry').append($('<option>', {
                    value: index,
                    text: country.name
                }));
            });
//Search the countries big and small
/*
            $.each(newObjCountries, function(index, country) {
                objArea.push(country.area);
            });

            for (i = 0; i < 5; i++) {
                var bigest = Math.max.apply(null, objArea);
                var indexBig = objArea.indexOf(bigest);
                $('#largest').append(`
                <p>${newObjCountries[indexBig].name}</p>
                <img id="flag" src="${newObjCountries[indexBig].flag}">
                `)
                newObjCountries.splice(indexBig, 1);
                objArea.splice(indexBig, 1);
            }

            for (i = 0; i < 5; i++) {
                var smallest = Math.min.apply(null, objArea.filter(Boolean));
                var indexSmall = objArea.indexOf(smallest);
                $('#smallest').append(`
                <p>${newObjCountries[indexSmall].name}</p>
                <img id="flag" src="${newObjCountries[indexSmall].flag}">
                `)
                newObjCountries.splice(indexSmall, 1);
                objArea.splice(indexSmall, 1);
            }
*/
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
                    html: language.name + ' (' + language.nativeName + ')'
                }))
            })



            $('#population').append(`
          <p>${objCountries[indexCountry].population} ${objCountries[indexCountry].demonym}s</p>`)
            $('#mainCity').append(`
              <h1>${objCountries[indexCountry].capital}</h1>
            `)
            $('#countryFlag').append(`<img id="flag" src="${objCountries[indexCountry].flag}">`)

            initMap(objCountries[indexCountry].latlng[0], objCountries[indexCountry].latlng[1]);

            function initMap(latitude, longitude) {
                var mapCenter = { lat: latitude, lng: longitude };

                var zoomObj = 7;

                if (objCountries[indexCountry].area > 400000) {
                    zoomObj = 6;
                } else if (objCountries[indexCountry].area > 200000) {
                    zoomObj = 7;
                } else if (objCountries[indexCountry].area > 50000) {
                    zoomObj = 8;
                } else if (objCountries[indexCountry].area > 25000) {
                    zoomObj = 9;
                } else if (objCountries[indexCountry].area < 10000) {
                    zoomObj = 10;
                }

                var map = new google.maps.Map($('#map')[0], {
                    center: mapCenter,
                    zoom: zoomObj
                });
                var icon = {
                    url: objCountries[indexCountry].flag, // url
                    scaledSize: new google.maps.Size(35, 25), // scaled size
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