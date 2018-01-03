var version= '0.0.5';
var cacheName = 'hello_update-v'+version;

self.addEventListener('install', function(event) {
  console.log('install (1)');
  const installFunc = function (cache) {
  	console.log('install (2)');
  	return cache.addAll(["/hello_update/","/hello_update/index.html"]);
  };
  event.waitUntil(caches.open(cacheName).then(installFunc));
});

self.addEventListener('fetch', function(event) {
	const responceFunc = function(response) {
		if (response) {
      return response;
    }
    if(event.request.url.replace(/^.*\/hello_update\//,"") != "") {
      // https://developer.mozilla.org/en/docs/Web/API/Response/Response
      var body = "# "+version+" : "+event.request.url.replace(/^.*\/hello_update\//,"");
      var init = { "status" : 200 , "statusText" : "OK" };
      var myResponse = new Response(body, init);
      return myResponse;
    }
    return fetch(event.request);
	};
  //https://developer.mozilla.org/en/docs/Web/API/FetchEvent/request
  //https://developer.mozilla.org/en/docs/Web/API/FetchEvent/respondWith
  //https://developer.mozilla.org/en/docs/Web/API/Cache/match
	event.respondWith(caches.match(event.request).then(responceFunc));
});

self.addEventListener('activate', function(event) {
  console.log("activate");
  caches.keys().then(function(cacheNames){
    return Promise.all(
      cacheNames.map(function(_cacheName) {
          console.log("n:"+_cacheName);
          if (_cacheName != cacheName) {
            return caches.delete(cacheName);
          }
        }
      )
    );
  });
});