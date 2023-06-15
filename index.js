import colors from "colors";
import dotenv from "dotenv";
import { readInput, inquirerMenu, pause, listPlaces } from "./helpers/inquirer.js";
import { Search } from "./models/search.js";

const main = async() => {
    // init dotenv config
    dotenv.config();
   
    const search = new Search();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Show message
                const place = await readInput('City: ');
                const places = await search.city(place);
                const selectId = await listPlaces(places);
                
                if( selectId === '0' ) continue;
                const selectPlace = places.find( place => place.id === selectId );

                search.addHistory(selectPlace.name);

                const selectWeather = await search.weatherCity(selectPlace.lat, selectPlace.long);
                // Search this place

                // Select the place

                // Weather

                // Show result
                if( selectPlace ) {
                    console.log('\nInformation about this place: '.green);
                    console.log('City: ', selectPlace.name);
                    console.log('Descp: ', selectWeather.desc);
                    console.log('Long: ', selectPlace.long);
                    console.log('Lat: ', selectPlace.lat);
                    console.log('Temp: ', selectWeather.temp);
                    console.log('Min: ', selectWeather.min);
                    console.log('Max: ', selectWeather.max);
                }
                
                break;
        
            case 2:
                search.capitalizeHistory.forEach( (place, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${place}`);
                } )
                break;
        }

        
 
        if( opt !== 0 )await pause();
    } while (opt !== 0);
}

main();