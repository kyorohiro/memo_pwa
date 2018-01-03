var cacheName = 'hello_newResponse-v0.0.1';

self.addEventListener('install', function(event) {
  console.log('# install (1)');
  const installFunc = function (cache) {
  	console.log('# install (2)');
  	return cache.addAll(["/hello_postMessage/","/hello_postMessage/index.html"]);
  };
  event.waitUntil(caches.open(cacheName).then(installFunc));
});

self.addEventListener('fetch', function(event) {
  console.log("# fetch : " + event.request.url);
	const responceFunc = function(response) {
		if (response) {
      return response;
    }
    return fetch(event.request);
	};
  //https://developer.mozilla.org/en/docs/Web/API/FetchEvent/request
  //https://developer.mozilla.org/en/docs/Web/API/FetchEvent/respondWith
  //https://developer.mozilla.org/en/docs/Web/API/Cache/match
	event.respondWith(caches.match(event.request).then(responceFunc));
});


self.addEventListener('message', function(e) {
  console.log("# receive message " + e);
  //
  // https://developer.mozilla.org/en/docs/Web/API/ServiceWorkerGlobalScope/clients
  // https://developer.mozilla.org/en/docs/Web/API/Clients
  self.clients.matchAll().then(clients =>
    clients.forEach(client => client.postMessage(e.data))
  );
}, false);