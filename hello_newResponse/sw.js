var cacheName = 'hello_newResponse-v0.0.1';

self.addEventListener('install', function(event) {
  console.log('install a');
  const installFunc = function (cache) {
  	console.log('install b');
  	return cache.addAll(["/hello_newResponse/index.html"]);
  };
  event.waitUntil(caches.open(cacheName).then(installFunc));
});

self.addEventListener('fetch', function(event) {
	const responceFunc = function(response) {
		if (response) {
      return response;
    }
    if(event.request.url.replace(/^.*\/hello_newResponse\//,"") != "") {
      // https://developer.mozilla.org/en/docs/Web/API/Response/Response
      var body = ""+event.request.url.replace(/^.*\/hello_newResponse\//,"");
      var init = { "status" : 200 , "statusText" : "OK" };
      var myResponse = new Response(body, init);
      return myResponse;
    }
    return fetch(event.request);
	};
  //https://developer.mozilla.org/ja/docs/Web/API/FetchEvent/request
  //https://developer.mozilla.org/en/docs/Web/API/FetchEvent/respondWith
  //https://developer.mozilla.org/en/docs/Web/API/Cache/match
	event.respondWith(caches.match(event.request).then(responceFunc));
});

