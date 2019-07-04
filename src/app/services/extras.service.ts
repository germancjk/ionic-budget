import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  categories = [
    { id: 1, es: 'Banco', en: 'Bank', icon: 'bank.png' },
    { id: 2, es: 'Belleza', en: 'Beauty', icon: 'beauty.png' },
    { id: 3, es: 'Casa', en: 'Home', icon: 'home.png' },
    { id: 4, es: 'Coche', en: 'Car', icon: 'car.png' },
    { id: 5, es: 'Comida', en: 'Groceries', icon: 'groceries.png' },
    { id: 6, es: 'Educación', en: 'Education', icon: 'education.png' },
    { id: 7, es: 'Entretenimiento', en: 'Entertainment', icon: 'entertainment.png' },
    { id: 8, es: 'Hardware', en: 'Hardware', icon: 'hardware.png' },
    { id: 9, es: 'Mascotas', en: 'pets', icon: 'pet.png' },
    { id: 10, es: 'Otros', en: 'Others', icon: 'others.png' },
    { id: 11, es: 'Ropa y calzados', en: 'Clothes and Shoes', icon: 'fashion.png' },
    { id: 12, es: 'Salud', en: 'Health', icon: 'health.png' },
    { id: 13, es: 'Transporte', en: 'Transport', icon: 'train.png' },
    { id: 14, es: 'Viajes', en: 'Travel', icon: 'travel.png' },
    { id: 15, es: 'Salario', en: 'Salary', icon: 'wallet.png' }
  ];

  constructor() { }

  name(id: number) {
    let name: string;

    let obj = this.categories.find((o, index) => {

      if (o.id === id) {
        name = this.categories[index].es;
        return true; // stop searching
      }
    });

    return name;
  }

  icon(id: number) {
    let icon: string;

    let obj = this.categories.find((o, index) => {

      if (o.id === id) {
        icon = '../../../assets/icons/' + this.categories[index].icon;
        return true; // stop searching
      }
    });

    return icon;
  }

}
