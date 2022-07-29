import Cars from './types/Cars';
import Winners from './types/Winners';
import ICar from './interfaces/ICar';
import IEngine from './interfaces/IEngine';
import IDriveMode from './interfaces/IDriveMode';
import IWinner from './interfaces/IWinner';

const BASE_URL = 'http://localhost:3000';

const GARAGE = `${BASE_URL}/garage`;
const ENGINE = `${BASE_URL}/engine`;
const WINNERS = `${BASE_URL}/winners`;

export const getCars = async (page = 1, limit = 7): Cars => {
  const queryURL = `${GARAGE}?_page=${page}&_limit=${limit}`;

  try {
    const response = await fetch(queryURL);
    const cars = await response.json() as ICar[];
    const count = response.headers.get('X-Total-Count');

    if (response.status === 200) return { cars, count };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return null;
};

export const getCar = async (id: number): Promise<ICar | null> => {
  try {
    const response = await fetch(`${GARAGE}/${id}`);
    const data = await response.json() as ICar;

    if (response.status === 200) return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return null;
};

export const createCar = async (body: Partial<ICar>): Promise<void> => {
  try {
    await fetch(GARAGE, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const deleteCar = async (id: number): Promise<void> => {
  try {
    await fetch(`${GARAGE}/${id}`, { method: 'DELETE' });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const updateCar = async (id: number, body: Partial<ICar>): Promise<void> => {
  try {
    await fetch(`${GARAGE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const startEngine = async (id: number): Promise<IEngine | null> => {
  try {
    const response = await fetch(`${ENGINE}?id=${id}&status=started`, { method: 'PATCH' });
    const data = await response.json() as IEngine;
    if (response.status === 200) return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return null;
};

export const stopEngine = async (id: number): Promise<IEngine | null> => {
  try {
    const response = await fetch(`${ENGINE}?id=${id}&status=stopped`, { method: 'PATCH' });
    const data = await response.json() as IEngine;
    if (response.status === 200) return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return null;
};

export const switchEngineToDriveMode = async (id: number): Promise<IDriveMode | null> => {
  try {
    const response = await fetch(`${ENGINE}?id=${id}&status=drive`, { method: 'PATCH' });
    const data = response.status === 200
      ? await response.json() as IDriveMode
      : { success: false };
    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return null;
};

export const getWinners = async (
  page: number,
  sort = 'time',
  order = 'ASC',
  limit = 10,
): Winners => {
  try {
    const response = await fetch(`${WINNERS}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const winners = await response.json() as IWinner[];
    const count = response.headers.get('X-Total-Count');
    if (response.status === 200) return { winners, count };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return null;
};

export const getWinner = async (id: number): Promise<IWinner | null> => {
  try {
    const response = await fetch(`${WINNERS}/${id}`);
    const data = await response.json() as IWinner;

    if (response.status === 200) return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return null;
};

export const createwinner = async (body: IWinner): Promise<void> => {
  try {
    await fetch(WINNERS, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const deleteWinner = async (id: number): Promise<void> => {
  try {
    await fetch(`${WINNERS}/${id}`, { method: 'DELETE' });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const updateWinner = async (id: number, body: Partial<IWinner>): Promise<void> => {
  try {
    await fetch(`${WINNERS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
