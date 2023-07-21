import { Injectable } from '@angular/core';
import { Konnektor } from '../models/konnektor.class';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private users = [
    {
      id: 1,
      name: 'Wolfgang',
      title: 'Head of IT development',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      role: 'admin',
      last_login: '',
    },
  ];

  private konnektors: Konnektor[] = [
    // id, name, is_active, online_since, firmware_version, update_available
    new Konnektor(1, 'AXP37G-4', true, '2020-01-01', 'v1.0.56', true),
    new Konnektor(2, 'AXP37G-4', false, '2023-01-01', 'v2.0.1', false),
  ];

  getKonnektors() {
    return this.konnektors.slice();
  }

  getRandomKonnektorValueArray(length: number, max: number, min: number) {
    const randomArray = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      randomArray.push(randomNumber);
    }
    return randomArray;
  }

  getRandomIntValue(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomFloatValue(max: number, min: number, decimalPlaces: number) {
    const randomFloat = Math.random() * (max - min) + min;
    return parseFloat(randomFloat.toFixed(decimalPlaces));
  }
}
