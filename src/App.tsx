import useSWR from 'swr';
import { api } from './utils/axios';
import { useEffect, useState } from 'react';
import { searchText } from './utils/search-text';
import { List } from './components/List';
import { Loader2 } from 'lucide-react';
export interface WordInterface {
  id: string;
  name: string;
  meaning: string;
  fixed: boolean;
}

export function App() {
  const [search, setSearch] = useState<string>('');
  const [words, setWords] = useState<WordInterface[]>([]);
  const uri = 'api';
  const { data, error, isLoading } = useSWR(uri, async () => {
    return (await api.get(uri)).data;
  });

  useEffect(() => {
    if (!data) return;

    const wordsList = data.filter((word: WordInterface) => {
      return searchText(word.name).includes(search);
    });

    setWords(wordsList);
  }, [data, search]);

  if (error) return <div>Erro ao carregar.</div>;

  return (
    <main className="min-h-screen p-10 space-y-8 text-white bg-gray-800">
      <input
        placeholder="Type words"
        className="w-full p-5 font-semibold text-white bg-gray-600 border rounded-xl placeholder:text-white"
        onChange={(event) => setSearch(searchText(event.target.value))}
      />

      {isLoading && (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 size={100} className="animate-spin" />
        </div>
      )}

      <List words={words} setWords={setWords} fixed />
      <List words={words} setWords={setWords} />
    </main>
  );
}
