import useSWR from "swr";
import { Layout } from "../components/Layout";
import { api } from "../utils/axios";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { searchText } from "../utils/search-text";
import { Loading } from "./Loading";
import { List } from "../components/word/List";
import { Form } from "../components/word/Form";


export interface WordInterface {
  id: number;
  name: string;
  meaning: string;
  fixed: boolean;
  bookId: number
}

export function Word() {
  const [search, setSearch] = useState('')
  const [words, setWords] = useState([] as WordInterface[])

  const uri = 'words';
  const { data, error, isLoading } = useSWR(uri, async () => {
    return (await api.get(uri)).data;
  });

  const { data: books } = useSWR('books', async() => {
    const {data} = await api.get('books')
    return data     
  })
  
  useEffect(() => {
    if (!data) return

    const wordsList = data.filter((word: WordInterface) => {
      return searchText(word.name).includes(search);
    });
    
    setWords(wordsList)
  }, [data,search])
  if (isLoading || !books) return <Loading />
  if (error) return <h1>error</h1>
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
          onClick={() => setSearch('')}
        />
      </div>
      <List
        words={words}
        setWords={setWords}
        fixed
      />

      <List
        words={words}
        setWords={setWords}
      />

      <Form
        words={words}
        setWords={setWords}
        books={books}
      />
    </Layout>
  )
}