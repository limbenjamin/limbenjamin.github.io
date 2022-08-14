/*********************************************************
 * This is custom New Relic script. Provisioned
 * for developers to add custom attributes and
 * modify behaviours.
 *********************************************************/

// Track custom attributes for pageview
if(window.newrelic){
  newrelic.setCustomAttribute('browser.cna.protocol', window.location.protocol);
  newrelic.setCustomAttribute('browser.cna.hostname', window.location.hostname);
  newrelic.setCustomAttribute('browser.cna.origin', window.location.origin);
  newrelic.setCustomAttribute('browser.cna.path', window.location.pathname);
  newrelic.setCustomAttribute('browser.cna.query', window.location.search);
  newrelic.setCustomAttribute('browser.cna.hash', window.location.hash);
}else{
  console.info('New Relic not injected');
}
