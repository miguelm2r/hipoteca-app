// Creamos el tipo de house y el draftHouse que usaremos en el formulario
export type House = {
  id: string;
  houseName: string;
  cost: number;
  mortageYear: number;
  mortageRate: number;
};

export type DraftHouse = Omit<House, "id">;
