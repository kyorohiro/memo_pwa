# sw notification gcm

0. create FCM account

0.1 setup gloud message

0.2 get Public-facing , Server key

1. change manifest.json

```
"gcm_sender_id": "253140864123"
```

gcm_sender_id is Public-facing name

2. pub serve

3. click Subscribe button

4. click Info button

5. push request

curl -X POST --header "TTL: 600" --header "Authorization: key={YourKey}" https://android.googleapis.com/gcm/send/fMw5dZ...

YourKey is  FCM's CludMessage 's Server key




