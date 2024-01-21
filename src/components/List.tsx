'use client';

import { WordCreateType } from '@/utils/schemas';
import { useState } from 'react';
import clsx from 'clsx';

interface Props {
  words: WordCreateType[];
}

export function List(props: Props) {
  const [words, setWords] = useState(props.words);
  const [fixeds, setFixeds] = useState<string[]>([]);

  console.log(fixeds);
  return (
    <>
      <input
        placeholder="Type words"
        className="w-full rounded-xl p-5 bg-gray-600 border text-white font-semibold placeholder:text-white"
        onChange={(event) => {
          const filter = event.target.value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          const filteredWords = props.words.filter((word) => {
            const wordFormat = word.name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');

            return wordFormat.includes(filter);
          });

          setWords(filteredWords);
        }}
      />

      <ul
        className={clsx(
          'grid grid-cols-3 lg:grid-cols-5 border rounded-xl bg-gray-700',
          {
            'grid-cols-1': words.length === 1,
            'grid-cols-2 lg:grid-cols-2': words.length === 2,
          },
        )}
      >
        {words.map((word) => {
          return (
            <li
              key={word.id}
              className="p-5 hover:cursor-pointer"
              onClick={() => {
                setFixeds([...fixeds, word.id!]);
              }}
            >
              <strong className="pr-2">{word.name.toUpperCase()}:</strong>
              {word.meaning}
            </li>
          );
        })}
      </ul>
    </>
  );
}
