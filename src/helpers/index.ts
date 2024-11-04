import { House } from "../types";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function monthlyPayment(house: House) {
  const monthlyRate = house.mortageRate / 100 / 12;
  const totalMonths = house.mortageYear * 12;
  const numerator =
    house.cost * monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
  const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
  return numerator / denominator;
}

export function totalPayment(house: House) {
  return monthlyPayment(house) * 12 * house.mortageYear;
}

export function totalInterest(house: House) {
  return monthlyPayment(house) * 12 * house.mortageYear - house.cost;
}

export function finalValue(house: House) {
  const inflation = 0.03;
  return house.cost * Math.pow(1 + inflation, house.mortageYear);
}
