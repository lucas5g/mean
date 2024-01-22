import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { api } from './utils/axios';
import { swr } from './utils/swr';

interface WordInterface {
  id: string;
  name: string;
  meaning: string;
  fixed: boolean;
}

export function App() {
  const [fixeds, setFixeds] = useState([] as string[]);

  const { data, error, isLoading} = swr('api')

  if(error) return <div>Erro ao carregar.</div>
  if(isLoading) return <div>Carregando...</div>
  
  const words:WordInterface[] = data

  return (
    <main className='h-screen p-10 space-y-8 text-white bg-gray-800'>
      <input
        placeholder="Type words"
        className="w-full p-5 font-semibold text-white bg-gray-600 border rounded-xl placeholder:text-white"
        onChange={(event) => {
          const filter = event.target.value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          const filteredWords = words?.filter((word) => {
            const wordFormat = word.name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');

            return wordFormat.includes(filter);
          });

          // setWords(filteredWords);
        }}
      />

      <ul
        className={clsx('grid grid-cols-3 lg:grid-cols-5 gap-2', {
          'grid-cols-1': words.length === 1,
          'grid-cols-2 lg:grid-cols-2': words.length === 2,
        })}
      >
        {words.map((word) => {
          return (
            <li key={word.id}>
              <button
                className={clsx('p-3  border rounded-xl overflow-hidden', {
                  'bg-gray-600': word.fixed,
                })}
                onClick={() => {
                  setFixeds([...fixeds, word.id]);
                }}
              >
                <strong className="pr-2">{word.name.toUpperCase()}</strong>
                <div>{word.meaning}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
