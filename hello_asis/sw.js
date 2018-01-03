var cacheName = 'hello-v0.0.1';

self.addEventListener('install', function(event){
	console.log('install (1)');
	const installFunc = function(cache) {
		console.log('install (2)');
  		return cache.addAll(["/hello_asis/", "/hello_asis/index.html"]);
	};
	event.waitUntil(caches.open(cacheName).then());
});

self.addEventListener('fetch', function(event){
	const fetchResponseFunc = function(response) {
		// non cahce, if we received a valid response
		if(!response || response.status !== 200 || response.type !== 'basic') {
			return response;
		}
		// IMPORTANT: Clone the response. A response is a stream
		var responseToCache = response.clone();
		caches.open(cacheName).then(function(cache) {
			cache.put(event.request, responseToCache);
		});
		return response;
	};
	const responseFunc = function(response) {
		if(response) {
			return response;
		}
		// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
		return fetch(event.request).then(fetchResponseFunc);
	};
	event.respondWith(caches.match(event.request).then(responseFunc));
});