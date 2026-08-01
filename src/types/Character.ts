// Tipos de datos para la API de Futurama
// https://futuramaapi.com/api/characters

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type Status = 'ALIVE' | 'DEAD' | 'UNKNOWN';

export interface Character {
  id: number;
  name: string;
  gender: Gender;
  status: Status;
  species: string;
  createdAt: string;
  image: string;
}

export interface CharactersResponse {
  items: Character[];
}