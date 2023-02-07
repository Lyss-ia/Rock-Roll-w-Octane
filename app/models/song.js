export default class Song {

    constructor({ title, rating, band }) {
        this.title = title;
        this.rating = rating ?? 0;
        this.band = band;
    }
}