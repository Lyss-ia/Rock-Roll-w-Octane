import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';

    
export default class BandsRoute extends Route {
    @service catalog;

    model() {
        
        let blackDog = new Song({
            title: 'Black Dog',
            rating: 3,
        });

        let yellowLedbetter = new Song({
            title: 'Yellow Ledbetter',
            rating: 4,
        });

        let pretender = new Song({
            title: 'The Pretender',
            rating: 2,
        });

        let daughter = new Song({
            title: 'Daughter',
            rating: 5,
        });

        let funeral = new Song({
                title: 'Funeral',
                rating: 5,
        });

        let ledZeppelin = new Band({
            id: 'led-zeppelin',
            name: 'Led Zeppelin',
            songs: [blackDog],
        });

        let pearlJam = new Band({
            id: 'pearl-jam',
            name: 'Pearl Jam',
            songs: [yellowLedbetter, daughter],
        });

        let fooFighters = new Band({
            id: 'foo-fighters',
            name: 'Foo Fighters',
            songs: [pretender],
        });

        let yungblud = new Band({
            id: 'yungblud',
            name: 'Yungblud',
            songs: [funeral],
        });

        blackDog.band = ledZeppelin;
        daughter.band = pearlJam;
        pretender.band = fooFighters;
        yellowLedbetter.band = pearlJam;
        funeral.band = yungblud;

        this.catalog.add('song', blackDog);
        this.catalog.add('song', yellowLedbetter);
        this.catalog.add('song', daughter);
        this.catalog.add('song', pretender);
        this.catalog.add('song', funeral);

        this.catalog.add('band', ledZeppelin);
        this.catalog.add('band', pearlJam);
        this.catalog.add('band', fooFighters);
        this.catalog.add('band', yungblud);
        return this.catalog.bands;
    }
}
        