import { module, test } from 'qunit';
import { setupTest } from 'rarwe/tests/helpers';

module('Unit | Service | band-navigation', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:band-navigation');
    assert.ok(service);
  });
});
