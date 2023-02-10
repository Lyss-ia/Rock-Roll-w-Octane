import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class BandsNewController extends Controller {
    @service catalog;
    @service router;
    @tracked name;

    constructor() {
        super(...arguments);
        this.router.on('routeWillChange', (transition) => {
            if(this.transition.isAborted){
                return;
            }
            if(this.confirmedLeave){
                return;
            }
            if (transition.from.name === 'bands.new') {
                if (this.name) {
                    let leave = window.confirm('You have unsaved changes. Are you sure?');
                    if (leave) {
                        this.confirmedLeave = true;
                    } 
                    else {
                        transition.abort();
                    }
                }
            }
        });
    }

    @action
    updateName(event) {
        this.name = event.target.value;
    }

    @action
    async saveBand() {
        let band = await this.catalog.create('band', { name: this.name });
        this.confirmedLeave = true;
        this.router.transitionTo('bands.band.songs', band.id);
    }        
}
