/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "precache-manifest.48ab8772ef60e2c0e6071ca8258ff7c3.js"
);

workbox.core.setCacheNameDetails({prefix: "servicos"});

importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAwyH80RSgf127IEjNJMzWrzCYF8-l8bh0",
	authDomain: "encontreprestadores-e519b.firebaseapp.com",
	databaseURL: "https://encontreprestadores-e519b.firebaseio.com",
	projectId: "encontreprestadores-e519b",
	storageBucket: "encontreprestadores-e519b.appspot.com",
	messagingSenderId: "353509701237",
	appId: "1:353509701237:web:225c4d7ac06397051aaa3c",
	measurementId: "G-8H2R60B20W"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(event) {})

self.addEventListener("push", function(event) {
	let dados = event.data.json();
	let mensagem = JSON.parse(dados.data.notification)
	let notificacao = self.registration.showNotification(mensagem.title, {
	    body: mensagem.body,
	    badge: 'https://menuapp.com.br/app/statics/icons/badge.png',
	    icon: 'https://menuapp.com.br/app/statics/icons/menuapp-64x64.png'
	  });

	event.waitUntil(notificacao);
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
})

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
