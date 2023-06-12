import axios from "axios"; 

class Search {
    history = ['Madrid', 'Wiesbaden', 'Murcia'];


    constructor(){
        // TODO: read DB, if exist
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit': 5,
            'language': 'en'
        }
    }

    async city( place = ''){
        try {
            console.log(this.paramsMapbox);
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map( place => (
                {
                    id: place.id,
                    name: place.place_name,
                    lng: place.center[0],
                    lat: place.center[1],
                }
            ) );
            
        } catch (error) {
            return []
        }
    }
}

export {
    Search
};