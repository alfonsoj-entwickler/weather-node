import fs from "fs";
import axios from "axios";

class Search {
    history = [];
    dbPath = './db/database.json';


    constructor() {
        this.readDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOW_KEY || '',
            'limit': 5,
            'language': 'en'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY || '',
            'units': 'metric',
            'lang': 'en'
        }
    }

    get capitalizeHistory() {

        return this.history.map(city => {
            let words = city.split(' ')
            words = words.map(word => word[0].toUpperCase() + word.substring(1));
            return words.join(' ');
        })
    }

    async city(place = '') {
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map(place => (
                {
                    id: place.id,
                    name: place.place_name,
                    long: place.center[0],
                    lat: place.center[1],
                }
            ));

        } catch (error) {
            return []
        }
    }

    async weatherCity(lat, long) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`,
                params: this.paramsOpenWeather
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            return []
        }
    }

    addHistory(place = '') {
        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }
        this.history.unshift(place.toLocaleLowerCase());
        // save in db
        this.saveDV();
    }

    saveDV() {
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) return null;

        const citiesDB = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        this.history = JSON.parse(citiesDB).history;
    }
}

export {
    Search
};