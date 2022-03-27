/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// TODO 3.8 - push a message using the web push library
const webPush = require('web-push');

const pushSubscription ={"endpoint":"https://fcm.googleapis.com/fcm/send/dGuAoU5xo78:APA91bFqvbqi_bNoayzc6l-SdFXoTozGnyUoJEmdrmBKziA6mm6ogNDJ7Gdyt-VkhhxckmQlss5ufb_D5KuEtbcxpXRFZmf3E7tRmOvpt9zl0vettoheRRuthValrsW0W8hOeUXAKVRm","expirationTime":null,"keys":{"p256dh":"BCyyke0aV6HGqpEoCxj-I-motOrADEz3trOEe9DmCEmCD9B3ZWXUbw9WoYBT3YQo09Lyi1J67JirvFnD3PeE7_A","auth":"Wpa4qAHRYGy5WYUsaQ4ytw"}};

// TODO 4.3a - include VAPID keys
const vapidPublicKey = 'BP7GLhoYPg0_GfaLloGJmglEVN15lAoEHjQtstFB1dP0wR5cPoZRAjXuBWBpsGWzJ56jVEyZD23-4iQL4Q1Gu40';
const vapidPrivateKey = 'j6EnsbJlj2zDBTB7v4nZAC3f2AVnLp66TiqLaPdTs1w';

const payload = 'Here is a payload!';

const options = {
  //gcmAPIKey: 'YOUR_SERVER_KEY',
  TTL: 60,

  // TODO 4.3b - add VAPID details
  vapidDetails: {
    subject: 'mailto: YOUR_EMAIL_ADDRESS',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey
  }
  
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
