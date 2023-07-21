import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

//////////////////////////////////

// let jsonFromServer = {key: 'allTasks'};
// let BASE_SERVER_URL: string;

// setURL('https://stefan-heinemann.developerakademie.net/smallest_backend_ever');

// const backend = {
//   getItem: (key: string) => {
//     if (!jsonFromServer['allTasks']) {
//       return null;
//     }
//     return jsonFromServer['allTasks'];
//   },
// };

// window.onload = async function () {
//   downloadFromServer();
// };

// async function downloadFromServer() {
//   let result = await loadJSONFromServer();
//   jsonFromServer = JSON.parse(result);
//   console.log('Loaded', result);
// }

// function setURL(url: string) {
//   BASE_SERVER_URL = url;
// }

/**
 * Loads a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */

// async function loadJSONFromServer() {
//   let response = await fetch(
//     BASE_SERVER_URL + '/nocors.php?json=database&noache=' + new Date().getTime()
//   );
//   return await response.text();
// }

// function loadJSONFromServerOld() {
//   return new Promise(function (resolve, reject) {
//     let xhttp = new XMLHttpRequest();
//     let proxy = determineProxySettings();
//     let serverURL =
//       proxy +
//       BASE_SERVER_URL +
//       '/nocors.php?json=database&noache=' +
//       new Date().getTime();

//     xhttp.open('GET', serverURL);

//     xhttp.onreadystatechange = function (oEvent) {
//       if (xhttp.readyState === 4) {
//         if (xhttp.status >= 200 && xhttp.status <= 399) {
//           resolve(xhttp.responseText);
//         } else {
//           reject(xhttp.statusText);
//         }
//       }
//     };

//     xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//     xhttp.send();
//   });
// }

// function determineProxySettings() {
//   return '';

//   if (window.location.href.indexOf('.developerakademie.com') > -1) {
//     return '';
//   } else {
//     return 'https://cors-anywhere.herokuapp.com/';
//   }
// }

// async function initSummary() {
//   await downloadFromServer();
// }
//////////////////////////////////////
