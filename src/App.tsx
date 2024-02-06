import useSWR from 'swr';
import { api } from './utils/axios';
import { useEffect, useState } from 'react';
import { searchText } from './utils/search-text';
import { List } from './components/List';
import { Loader2, X } from 'lucide-react';
import clsx from 'clsx';
export interface WordInterface {
  id: string;
  name: string;
  meaning: string;
  fixed: boolean;
}

export function App() {
  const [search, setSearch] = useState<string>('');
  const [words, setWords] = useState<WordInterface[]>([]);
  const uri = 'words';
  const { data, error, isLoading } = useSWR(uri, async () => {
    return (await api.get(uri)).data;
  });

  useEffect(() => {
    if (!data) return;

    const wordsList = data.filter((word: WordInterface) => {
      return searchText(word.name).includes(search.trim());
    });

    setWords(wordsList);
  }, [data, search]);

  if (error) return <div>Erro ao carregar.</div>;

  return (
    <main className="min-h-screen lg:p-20 p-10 space-y-6 text-white bg-gray-800">
      <div className="flex items-center relative justify-end">
        <input
          placeholder="Type word"
          className="w-full p-5 font-semibold text-white bg-gray-600 border rounded-xl placeholder:text-white"
          onChange={(event) => setSearch(searchText(event.target.value))}
          value={search}
        />
        <X
          className={clsx('absolute mr-5 size-8 hover:cursor-pointer', {
            hidden: search.length === 0,
          })}
          onClick={() => setSearch('')}
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 size={100} className="animate-spin" />
        </div>
      )}
      {!isLoading && (
        <>
          <List words={words} setWords={setWords} fixed />
          <List words={words.slice(0, 25)} setWords={setWords} />
        </>
      )}
    </main>
  );
}
