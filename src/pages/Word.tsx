import { Layout } from '../components/Layout';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { searchText } from '../utils/search-text';
import { Loading } from './Loading';
import { List } from '../components/word/List';
import { Form } from '../components/word/Form';
import { useFetch } from '../utils/use-Fetch';

export interface WordInterface {
  id: number;
  name: string;
  meaning: string;
  fixed: boolean;
  bookId: number;
}

export function Word() {
  const [search, setSearch] = useState('');
  const [, setUri] = useState('words')
  const [words, setWords] = useState([] as WordInterface[]);

  const { data, error, isLoading } = useFetch('words')

  const { data: books } = useFetch('books')

  useEffect(() => {
    if (!data) return;


    const wordsList = data.words.filter((word: WordInterface) => {
      return searchText(word.name).includes(search);
    });

    setWords(wordsList);
    if (wordsList.length === 0) {
      setUri(`words?name=${search}`)
    }

    if (search.length === 0) {
      setUri('words')
    }


  }, [data, search]);

  if (error) return <h1>error</h1>;
  return (
    <Layout>
      <div className="relative flex items-center justify-end">
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
          onClick={() => {
            setSearch('')
          }}
        />
      </div>

      {isLoading && <Loading />}
      {data &&
        <>
          <List words={words} setWords={setWords} fixed />

          <List words={words} setWords={setWords} />
          <Form words={words} setWords={setWords} books={books} />
        </>
      }

      {data && words.length === 0 &&
        <h1 className='text-gray-300'>

          Nada encontrado :(
        </h1>
      }

    </Layout>
  );
}
