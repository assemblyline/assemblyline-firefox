var _      = require('lodash');

function saveOptions() {
  var token = document.getElementById('token').value;
  var environments = _.split(document.getElementById('environments').value, ',')
  browser.storage.local.set({
    token: token,
    environments: environments,
  }, function() {
    document.body.innerHTML = '<h3>Options saved</h3>';
    setTimeout(function() { window.close(); }, 600);
  });
}
document.getElementById('save').addEventListener('click', saveOptions);

function restoreOptions() {
  browser.storage.local.get({
    token: '',
    environments: ['staging','production'],
  }, function(items) {
    document.getElementById('token').value = items.token;
    document.getElementById('environments').value = _.join(items.environments, ',');
  });

  browser.storage.local.getBytesInUse(null, function(bytes) {
    document.getElementById('cache-info').innerHTML = 'Cache size: ' + Math.round(bytes / 1024)  + ' KiB';
  })
}
document.addEventListener('DOMContentLoaded', restoreOptions);

function clearCache() {
  browser.storage.local.get('token', function(items) {
    browser.storage.local.clear(function() {
      browser.storage.local.set({
        token: items.token,
      }, function() {
        restoreOptions();
        document.getElementById('cache').innerHTML = '<b>Cache Cleared</b>';
      });
    });
  });
}
document.getElementById('cache').addEventListener('click', clearCache);
