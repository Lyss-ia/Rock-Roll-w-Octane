import EmberRouter from '@ember/routing/router';
import config from 'rarwe/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('bands', function () {
    this.route('band', { path: ':id' }, function () {
      this.route('songs');      
    });
    this.route('new');
  });
});
