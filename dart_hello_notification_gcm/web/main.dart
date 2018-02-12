import 'dart:html' as html;
import 'package:pwa/client.dart' as pwa;
import 'dart:async';
import 'dart:convert';


main() async {
  pwa.Client client = new pwa.Client(scriptUrl: './pwa.dart.js');
  pwa.PushPermission p = await client.getPushPermission();
  html.Element outoutElm = html.document.querySelector("#output");

  html.document.querySelector("#sb").onClick.listen((html.MouseEvent e) async {
    print("Subscribe");
    p = await client.getPushPermission(subscribeIfNeeded: true);
  });

  html.document.querySelector("#unsb").onClick.listen((html.MouseEvent e) async {
    print("UNSB");
    await p.unsubscribe();
  });

  html.document.querySelector("#info").onClick.listen((html.MouseEvent e) async {
    String info = "";
    info += "isDenied : ${p.isDenied}<br>";
    info += "isGranted : ${p.isGranted}<br>";
    info += "isSubscribed : ${p.isSubscribed}<br>";
    info += "isPrompt : ${p.isPrompt}<br>";
    info += "endpointUrl : ${p.endpointUrl}<br>";
    info += "clientKeys :${p.clientKeys}<br>";
    info += """curl -X POST  --header "TTL: 600" --header "Authorization: key={YourKey}" ${p.endpointUrl}<br>""";
    outoutElm.innerHtml = "<div text-align: left;>${info}</div>";
  });

  print(p.toString());
}