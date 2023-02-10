import Service from '@ember/service';
import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';
import { tracked } from 'tracked-built-ins';
import { isArray } from '@ember/array';


function extractRelationships(object) {
    let relationships = {};
    for (let relationshipName in object) {
        relationships[relationshipName] =
        object[relationshipName].links.related;
    }
    return relationships;
}

export default class CatalogService extends Service {
    storage = {};

    constructor() {
    super(...arguments);
    this.storage.bands = tracked([]);
    this.storage.songs = tracked([]);
    }

    async fetchAll(type) {
        if (type === 'bands') {
            let response = await fetch('/bands');
            let json = await response.json();
            this.loadAll(json);
        return this.bands;
        }

        if (type === 'songs') {
            let response = await fetch('/songs');
            let json = await response.json();
            this.loadAll(json);
            return this.songs;
        }
    }

    loadAll(json) {
        let records = [];
        for (let item of json.data) {
            records.push(this._loadResource(item));
        }
        return records;
    }

    load(response) {
        return this._loadResource(response.data);
    }

    _loadResource(data) {
        let record;
        let { id, type, attributes, relationships } = data;
        if (type === 'bands') {
            let rels = extractRelationships(relationships);
            record = new Band({ id, ...attributes }, rels);
            this.add('band', record);
            }
        if (type === 'songs') {
            let rels = extractRelationships(relationships);
            record = new Song({ id, ...attributes }, rels);
            this.add('song', record);
        }
        return record;
    }

    async fetchRelated(record, relationship) {
        let url = record.relationships[relationship];
        let response = await fetch(url);
        let json = await response.json();
        if (isArray(json.data)) {
            record[relationship] = this.loadAll(json);
        } 
        else {
            record[relationship] = this.load(json);
        }
        return record[relationship];
    }
        
    async create(type, attributes, relationships = {}) {
        let payload = {
            data: {
                type: type === 'band' ? 'bands' : 'songs',
                attributes,
                relationships,
            },
        };
        let response = await fetch(type === 'band' ? '/bands' : '/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(payload),
        });
        let json = await response.json();
        return this.load(json); 
    } 
    
    async update(type, record, attributes) {
        let payload = {
            data: {
                id: record.id,
                type: type === 'band' ? 'bands' : 'songs',
                attributes,
            },
        };
        let url = type === 'band' ? `/bands/${record.id}` :
        `/songs/${record.id}`;
        await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(payload),
        });
        }

    add(type, record) {
    let collection = type === 'band' ? this.storage.bands :
    this.storage.songs;
    collection.push(record);
    }

    get bands() {
    return this.storage.bands;
    }

    get songs() {
    return this.storage.songs;
    }

    find(type, filterFn) {
    let collection = type === 'band' ? this.bands : this.songs;
    return collection.find(filterFn);
    }
}