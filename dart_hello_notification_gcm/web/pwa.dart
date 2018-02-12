import 'package:pwa/worker.dart';

void main() {
  Worker worker = new Worker();

  worker.offlineUrls = <String>[
    "http://localhost:8080/",
    "http://localhost:8080/index.html",
    "http://localhost:8080/packages/browser/dart.js",
    "http://localhost:8080/main.dart.js",
  ];
  worker.pushHandler = (PushContext pushContext) async {
    await pushContext.showNotification(new Notification("pushed"));
  };
  worker.run(version: "v0.0.7");
}