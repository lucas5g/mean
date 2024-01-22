import { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';

interface WordInterface {
  id: string;
  name: string;
  meaning: string;
  fixed: boolean;
}

export function App() {
  const [words, setWords] = useState<WordInterface[]>();
  const [fixeds, setFixeds] = useState([] as string[]);

  useEffect(() => {
    const api = 'api'

    axios.get(api).then((res) => setWords(res.data));
  }, []);

  if (words?.length === 0 || !words) {
    return <h1>carregando..</h1>;
  }

  return (
    <main>
      <input
        placeholder="Type words"
        className="w-full rounded-xl p-5 bg-gray-600 border text-white font-semibold placeholder:text-white"
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

          setWords(filteredWords);
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
