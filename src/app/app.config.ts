import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';


const firebaseConfig = {
  projectId: "gdi-firebase-auth-a8ca9",
  appId: "1:572220594585:web:f0b9ab9822e9dee1369b08",
  storageBucket: "gdi-firebase-auth-a8ca9.firebasestorage.app",
  apiKey: "AIzaSyAKxvBSIg34VQLxMzpi6s0XjagrHtYreU0",
  authDomain: "gdi-firebase-auth-a8ca9.firebaseapp.com",
  messagingSenderId: "572220594585",
  databaseURL: 'https://gdi-firebase-auth-a8ca9-default-rtdb.europe-west1.firebasedatabase.app'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Inicializa Firebase UNA SOLA VEZ
    provideAuth(() => getAuth()), // Proporciona la autenticación UNA SOLA VEZ
    provideDatabase(() => getDatabase())
  ]
};
