import 'package:pwa/worker.dart' as pwa;

void main() {
  pwa.Worker worker = new pwa.Worker();
  worker.offlineUrls = <String>[];
  worker.offlineUrls.addAll(<String>[
    "http://localhost:8000/index.html",
    "http://localhost:8000/"
  ]);
  worker.run(version: "version0.0.1");
}
