import clsx from 'clsx';
import useSWR from 'swr';
import { api } from './utils/axios';
import { useState } from 'react';
import { searchText } from './utils/search-text';
import { List } from './components/List';
export interface WordInterface {
  id: string;
  name: string;
  meaning: string;
  fixed: boolean;
}

export function App() {
  const [search, setSearch] = useState<string>('');
  const uri = 'api';
  const { data, error } = useSWR(uri, async () => {
    return (await api.get(uri)).data;
  });

  if (error) return <div>Erro ao carregar.</div>;
  if (!data) return <div>Carregando...</div>;

  const words: WordInterface[] = data.filter((word: WordInterface) => {
    return searchText(word.name).includes(search);
  });

  return (
    <main className="min-h-screen p-10 space-y-8 text-white bg-gray-800">
      <input
        placeholder="Type words"
        className="w-full p-5 font-semibold text-white bg-gray-600 border rounded-xl placeholder:text-white"
        onChange={(event) => setSearch(searchText(event.target.value))}
      />

      <List words={words.filter(word => word.fixed)} />
      <List words={words.filter(word => !word.fixed)} />

    </main>
  );
}
