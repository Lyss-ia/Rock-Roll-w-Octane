import { tracked } from '@glimmer/tracking';

export default class Band {

    @tracked name;
    @tracked songs;

    constructor({ id, name, songs }) {
        this.id = id;
        this.name = name;
        this.songs = songs || [];
    }
}
