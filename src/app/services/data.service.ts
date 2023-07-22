import { Injectable } from '@angular/core';
import { Konnektor } from '../models/konnektor.class';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public users: Array<User> = [];

  registrated_users: any = [
    {
      id: 1,
      name: 'Wolfgang',
      title: 'Head of IT development',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      role: 'admin',
      image_path: 'assets/img/wolfgang.jpg',
    },
    {
      id: 2,
      name: 'Axel',
      title: 'CEO',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      role: 'admin',
      image_path: 'assets/img/axel.jpg',
    },
    {
      id: 3,
      name: 'Jan',
      title: 'Head of PM',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      role: 'admin',
      image_path: 'assets/img/jan.jpg',
    },
    {
      id: 4,
      name: 'Markus',
      title: 'Division eHealth',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      role: 'admin',
      image_path: 'assets/img/markus.jpg',
    },
    {
      id: 5,
      name: 'Kai',
      title: 'CTO',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      role: 'admin',
      image_path: 'assets/img/kai.webp',
    },
    {
      id: 6,
      name: 'Stefan',
      title: 'Front-End Developer',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      role: 'admin',
      image_path: 'assets/img/stefan.jpg',
    },
    {
      id: 7,
      name: 'Thomas',
      title: 'CFO',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      role: 'admin',
      image_path: 'assets/img/thomas.webp',
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

  getUsers() {
    let randomUserListLength = Math.floor(Math.random() * 3) + 12;
    for (let i = 0; i < randomUserListLength; i++) {
      let randomUser = Math.floor(Math.random() * 7);
      this.users.push(
        new User(
          this.registrated_users[randomUser].id,
          this.registrated_users[randomUser].name,
          this.registrated_users[randomUser].title,
          this.registrated_users[randomUser].email,
          this.registrated_users[randomUser].password,
          this.registrated_users[randomUser].role,
          this.registrated_users[randomUser].image_path
        )
      );
    }
    return this.users.slice();
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
