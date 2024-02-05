import clsx from "clsx";
import { WordInterface } from "../App";
import { mutate } from "swr";
import { api } from "../utils/axios";

interface Props {
  words: WordInterface[],
}
export function List({ words }: Props) {
  return (
    <ul className={clsx('grid grid-cols-3 lg:grid-cols-5 gap-5', {
      'grid-cols-1': words.length === 1,
      'grid-cols-2 lg:grid-cols-2': words.length === 2,
    })}>
      {words.map(word => {
        return (
          <li
            key={word.id}
            className={clsx('p-2 border rounded-xl hover:cursor-pointer ', {
              'bg-gray-600': word.fixed,
            })}
            onClick={async () => {
              await api.patch('api/'.concat(word.id), {
                fixed: !word.fixed,
              });

              const updateWords = words.map((row) => {
                if (row.id === word.id) {
                  row.fixed = !row.fixed;
                }
                return row;
              });
              mutate('api', updateWords)
              // mutate(updateWords);
            }}
          >
            <strong className="pr-2">{word.name.toUpperCase()}</strong>
            <div>{word.meaning}</div>
          </li>
        )

      })}
    </ul>
  )
}