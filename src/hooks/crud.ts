import * as React from 'react';
import Axios from 'axios';

import { IDTO } from '../interfaces/AllInterfaces';

interface IUseCRUDProps<T> {
  baseUrl: () => string;
  notLoadOnInit?: boolean;
  idPath?: (item: T) => number | string | undefined;
}

interface ICRUDModel<T> {
  items: T[];
  get: () => Promise<void>;
  getDetails: (id: number | string) => Promise<T>;
  create: (item: T) => Promise<T>;
  update: (item: T) => Promise<void>;
  remove: (item: T) => Promise<void>;
  emptyItems: () => void;
}

export function useCRUD<T extends IDTO<number | string>>({ baseUrl, notLoadOnInit, idPath }: IUseCRUDProps<T>): ICRUDModel<T> {
  const [items, setItems] = React.useState<T[]>([]);
  idPath = idPath || ((item) => item.id);

  React.useEffect(() => {
    get();
  }, []);

  async function get() {
    const response = await Axios.get<T[]>(baseUrl() + '/GetAll');
    setItems(response?.data);
  }

  async function getDetails(id: number | string) {
    const response = await Axios.get<T>(`${baseUrl()}/Get/${id}1`);
    return response?.data;
  }

  async function create(item: T) {
    const response = await Axios.post<T>(baseUrl(), item);
    await get();
    return response?.data;
  }

  async function update(item: T) {
    await Axios.put(`${baseUrl()}/${idPath!(item)}`, item);
    await get();
  }

  async function remove(item: T) {
    await Axios.delete(`${baseUrl()}/${idPath!(item)}`);
    await get();
  }

  return { items, get, getDetails, create, update, remove, emptyItems: () => setItems([]) };
}