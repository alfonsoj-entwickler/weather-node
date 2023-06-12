import colors from "colors";
import dotenv from "dotenv";
import { readInput, inquirerMenu, pause, listPlaces } from "./helpers/inquirer.js";
import { Search } from "./models/seaarch.js";

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
                const selectPlace = places.find( place => place.id === selectId );

                // Search this place

                // Select the place

                // Weather

                // Show result
                console.log('\nInformation about this place: '.green);
                console.log('City: ',selectPlace.name);
                console.log('',selectPlace.lng);
                console.log('',selectPlace.lat);
                console.log('',);
                console.log('',);
                console.log('',);
                console.log('',);
                break;
        
            case 2:
                break;
        }

        
        console.log(opt);
        if( opt !== 0 )await pause();
    } while (opt !== 0);
}

main();