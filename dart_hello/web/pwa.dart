import 'package:pwa/worker.dart';

void main() {
  Worker worker = new Worker();

  worker.offlineUrls = <String>[
    "http://localhost:8000/",
    "http://localhost:8000/index.html",
    "http://localhost:8000/packages/browser/dart.js",
    "http://localhost:8000/main.dart.js",
  ];

  worker.run(version: "v0.0.1");
}
