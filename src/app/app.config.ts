import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({ "projectId": "gdi-firebase-auth-a8ca9", "appId": "1:572220594585:web:f0b9ab9822e9dee1369b08", "storageBucket": "gdi-firebase-auth-a8ca9.firebasestorage.app", "apiKey": "AIzaSyAKxvBSIg34VQLxMzpi6s0XjagrHtYreU0", "authDomain": "gdi-firebase-auth-a8ca9.firebaseapp.com", "messagingSenderId": "572220594585" })), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"gdi-firebase-auth-a8ca9","appId":"1:572220594585:web:f0b9ab9822e9dee1369b08","storageBucket":"gdi-firebase-auth-a8ca9.firebasestorage.app","apiKey":"AIzaSyAKxvBSIg34VQLxMzpi6s0XjagrHtYreU0","authDomain":"gdi-firebase-auth-a8ca9.firebaseapp.com","messagingSenderId":"572220594585"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"gdi-firebase-auth-a8ca9","appId":"1:572220594585:web:a864d78b072b8939369b08","storageBucket":"gdi-firebase-auth-a8ca9.firebasestorage.app","apiKey":"AIzaSyAKxvBSIg34VQLxMzpi6s0XjagrHtYreU0","authDomain":"gdi-firebase-auth-a8ca9.firebaseapp.com","messagingSenderId":"572220594585"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"gdi-firebase-auth-a8ca9","appId":"1:572220594585:web:f0b9ab9822e9dee1369b08","storageBucket":"gdi-firebase-auth-a8ca9.firebasestorage.app","apiKey":"AIzaSyAKxvBSIg34VQLxMzpi6s0XjagrHtYreU0","authDomain":"gdi-firebase-auth-a8ca9.firebaseapp.com","messagingSenderId":"572220594585"})), provideAuth(() => getAuth())]
};
