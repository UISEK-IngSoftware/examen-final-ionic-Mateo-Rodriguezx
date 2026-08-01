import axios from 'axios';
import { CharactersResponse } from '../types/Character';

// URL base de la API de Futurama
const BASE_URL = 'https://futuramaapi.com/api/characters';

/**
 * Obtiene la lista de personajes de Futurama, ordenados por ID ascendente.
 * Usa Axios (obligatorio según los requisitos del proyecto).
 */
export const getCharacters = async (): Promise<CharactersResponse> => {
  const response = await axios.get<CharactersResponse>(BASE_URL, {
    params: {
      orderBy: 'id',
      orderByDirection: 'asc',
      page: 1,
      size: 50,
    },
  });

  return response.data;
};