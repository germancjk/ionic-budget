import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Pipe({
    name: 'translate'
})

export class TranslatePipe implements PipeTransform {

  // Traducciones
  translate: any[] = [];
  lang: string;

  constructor( private configService: ConfigService ) {

    this.configService.load();
    this.lang = this.configService.config.lang;

    this.translate['es'] = [{
      settings: 'Configuración',
      select: 'Selecciona',
      back: 'Volver',
      amount: 'Monto',
      category: 'Categoria',
      add: 'Agregar',
      home: 'Inicio',
      rateus: 'Valoranos',
      home_balance_mensual : 'Balance mensual',
      home_balance_total : 'Balance acumulado',
      home_incomes : 'Ingresos mes',
      home_expenses : 'Gastos mes',
      home_months: 'Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre',
      home_card_start: 'Comienza Ahora',
      home_card_welcome: 'Bienvenido',
      home_card_content: 'Pulsa el signo de + para agregar tu ingreso o gasto.',
      stats_title: 'Estadísticas',
      stats_monthly: 'Estadísticas Mensuales',
      stats_year: 'Estadísticas Anuales',
      config_title: 'Configuración',
      config_wallet_name: 'Nombre de cartera',
      config_lang: 'Idioma',
      config_coin: 'Moneda',
      config_annual: 'Balance Anual Acumulado',
      add_income: 'Ingreso',
      add_expense: 'Gasto',
      add_yesterday: 'Ayer',
      add_today: 'Hoy',
      add_other: 'Otra',
      add_concept: 'Concepto (opcional)',
      select_category: 'Selecciona una categoria',
      detail_title: 'Detalle del movimiento'
    }];

    this.translate['en'] = [{
      settings: 'Settings',
      select: 'Select',
      back: 'Back',
      amount: 'Amount',
      category: 'Category',
      add: 'Add',
      home: 'Home',
      rateus: 'Rate Us',
      home_balance_mensual : 'Month balance',
      home_balance_total : 'Accumulated balance',
      home_incomes : 'Month incomes',
      home_expenses : 'Month expenses',
      home_months: 'January, Febraury, March, April, May, June, July, August, September, October, November, December',
      home_card_start: 'Start Now',
      home_card_welcome: 'Welcome',
      home_card_content: 'Push on the + to add new income or expense.',
      stats_title: 'Stats',
      stats_monthly: 'Monthly Stats',
      stats_year: 'Annual Stats',
      config_title: 'Settings',
      config_wallet_name: 'Wallet Name',
      config_lang: 'Language',
      config_coin: 'Coin',
      config_annual: 'Annual Accumulated Balance',
      add_income: 'Income',
      add_expense: 'Expense',
      add_yesterday: 'Yesterday',
      add_today: 'Today',
      add_other: 'Other',
      add_concept: 'Description (optional)',
      select_category: 'Select a category',
      detail_title: 'Detail'
    }];
  }

    transform(value: string): string {

      return this.translate[this.lang][0][value];
    }
}
