if(!self.define){let e,n={};const s=(s,a)=>(s=new URL(s+".js",a).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(n[c])return;let o={};const t=e=>s(e,c),r={module:{uri:c},exports:o,require:t};n[c]=Promise.all(a.map((e=>r[e]||t(e)))).then((e=>(i(...e),o)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d79f403064a41cfe1ad6d539b6b8ec48"},{url:"/_next/static/a0TyGS5VYkyC-qo8DESMk/_buildManifest.js",revision:"02b926c0e0d93f81521380ea4167e5c8"},{url:"/_next/static/a0TyGS5VYkyC-qo8DESMk/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/255-96c286610bfcc94e.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/5095844a-7f65a387f803ae5b.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/677-bad076c959540c04.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/698-904d9e90a05dd3b9.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/749-8e07c74eb177b405.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/app/error-6d72b7e690fcaf36.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/app/layout-d592b821f8c82199.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/app/page-27c18fe649712bfb.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/bce60fc1-b3df641efe50afdc.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/main-app-9f2c48560542527e.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/main-b1216f119a80db41.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/pages/_app-b75b9482ff6ea491.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/pages/_error-7fafba9435aeb6bc.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-7294f07e56b8f21d.js",revision:"a0TyGS5VYkyC-qo8DESMk"},{url:"/_next/static/css/49f9bf5fc06d203b.css",revision:"49f9bf5fc06d203b"},{url:"/android-icon-144x144.png",revision:"22ccf09931c977cffc21a7295a35278b"},{url:"/android-icon-192x192.png",revision:"7c170726b508b018a58b7b9c43c724af"},{url:"/android-icon-36x36.png",revision:"ee855929df9b6b2f8927130ec4898664"},{url:"/android-icon-48x48.png",revision:"09548bb70240c3f93ce4c94a7b2bf07f"},{url:"/android-icon-72x72.png",revision:"f4f6aa4911c1d1926e270bfda5376f48"},{url:"/android-icon-96x96.png",revision:"f1df72ea2911bf6c9b68853c96defffd"},{url:"/apple-icon-114x114.png",revision:"a826cc9d151d647d6f180be741abe510"},{url:"/apple-icon-120x120.png",revision:"dcc4eaa25acef44d90eaacd5b8aacb66"},{url:"/apple-icon-144x144.png",revision:"22ccf09931c977cffc21a7295a35278b"},{url:"/apple-icon-152x152.png",revision:"eba2457648c7f121f6781b1782b5f8b9"},{url:"/apple-icon-180x180.png",revision:"d6180792231496550a3ef29c5dfc6e0d"},{url:"/apple-icon-57x57.png",revision:"9c6500688899957de004537f87291d07"},{url:"/apple-icon-60x60.png",revision:"930fb4f6c9140d75ba4cd7494a4dac5f"},{url:"/apple-icon-72x72.png",revision:"f4f6aa4911c1d1926e270bfda5376f48"},{url:"/apple-icon-76x76.png",revision:"e4381bae279e6c617258a3540ecbe6e1"},{url:"/apple-icon-precomposed.png",revision:"0d3a97771079a9eca71a95df8ddd6ceb"},{url:"/apple-icon.png",revision:"0d3a97771079a9eca71a95df8ddd6ceb"},{url:"/browserconfig.xml",revision:"653d077300a12f09a69caeea7a8947f8"},{url:"/favicon-16x16.png",revision:"5c2b7b4cdf16c68c98b8f4640179753a"},{url:"/favicon-32x32.png",revision:"499ca7772d0bf1a549625acb465dd795"},{url:"/favicon-96x96.png",revision:"f1df72ea2911bf6c9b68853c96defffd"},{url:"/favicon.ico",revision:"f56f869f7a54e0be6b829c041c3b39a3"},{url:"/manifest.json",revision:"f008ac522d37d471dd97c1ee94987c95"},{url:"/ms-icon-144x144.png",revision:"22ccf09931c977cffc21a7295a35278b"},{url:"/ms-icon-150x150.png",revision:"6c0bf82cd7b5bf50afef89c6c8d97a35"},{url:"/ms-icon-310x310.png",revision:"f51db2665f20f1d4d2f657e9f5dd9fab"},{url:"/ms-icon-70x70.png",revision:"192e4a9f5202b58ff6e4c85062646692"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:a})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
