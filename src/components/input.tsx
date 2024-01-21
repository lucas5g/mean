'use client';

import { WordCreateType } from '@/utils/schemas';

interface Props {
  words: WordCreateType[];
}
export function Input(props: Props) {
  return (
    <input
      placeholder="Type words"
      className="w-full rounded-xl p-5 bg-gray-600 border text-white font-semibold placeholder:text-white"
      onChange={(event) => {
        const filter = event.target.value;

        const words = props.words.filter((word) => word.name.includes(filter));

        console.log(words);
      }}
    />
  );
}
