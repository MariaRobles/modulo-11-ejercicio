const reservas = [
  {
  tipoHabitacion: "standard",
  pax: 1,
  noches: 3
  },
  {
  tipoHabitacion: "standard",
  pax: 1,
  noches: 4
  },
  {
  tipoHabitacion: "suite",
  pax: 2,
  noches: 1
  }
];

class clienteParticular {
  constructor () {
    this._reservas = [];
    this._subtotal = 0;
    this._total = 0;
    this._iva = 1.21;
  }

  calculaSubtotal() {
    this._subtotal = reservas.reduce(
      (acc, { tipoHabitacion, noches, pax }) => 
        acc + (noches * this.calcularPrecioHabitacion(tipoHabitacion)) + this.calcularRecargoPersonaExtra(pax) , 0)
  }

  calcularTotal() {
    this._total = reservas.reduce(
      (acc, { tipoHabitacion, noches, }) => acc + noches * (this.calcularPrecioHabitacion(tipoHabitacion) * this._iva), 0)
  }

  calcularPrecioHabitacion(tipoHabitacion){
    switch (tipoHabitacion) {
      case 'standard':
        return 100;
      case 'suite':
        return 150;
    }
    return 1;
  }

  calcularRecargoPersonaExtra (personaExtra){
    return (personaExtra > 1 ? (personaExtra - 1) * 40 : 0);
  }

  get subtotal() {
    return this._subtotal;  
  }

  get total() {
    return this._total;  
  }

 

  set reservas(reservasExt) {
    this._reservas = reservasExt; 
    this.calculaSubtotal();
    this.calcularTotal();
  }
}


const particular = new clienteParticular();
particular.reservas = reservas;

console.log("Subtotal = ", particular.subtotal.toFixed(2), "€");
console.log("Total = ", particular.total.toFixed(2), "€");


/*************** extiendo la clase padre ****************/

class tourOperador extends clienteParticular{ 
  calcularTotal() {
    this._total = reservas.reduce(
      (acc, { tipoHabitacion, noches, }) => acc + noches * (this.calcularPrecioHabitacion(tipoHabitacion) * this._iva) * 0.85, 0)
  }

  calcularPrecioHabitacion(tipoHabitacion){
    switch (tipoHabitacion) {
      case 'standard':
        return 100;
      case 'suite':
        return 100;
    }
    return 1;
  }
}

const totalTourOperador = new tourOperador();
totalTourOperador.reservas = reservas;
console.log("Total Tour Operador = ", totalTourOperador.total.toFixed(2), "€");

  