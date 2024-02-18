import useSWR from "swr";
import { Layout } from "../components/Layout";
import { api } from "../utils/axios";
import { Loading } from "./Loading";
import { Form } from "../components/book/Form";
import { useEffect, useState } from "react";

export interface BookInterface {
  id: number
  name: string
  _count: {
    words: number
  }
}

export function Book() {

  const [books, setBooks] = useState([] as BookInterface[])

  const { data, isLoading, error } = useSWR('books', async () => {
    const { data } = await api.get('books')
    return data
  })

  useEffect(() => {
    setBooks(data)
    
  },[data])
  
  if (error) return <h1>erro</h1>
  if (isLoading) return <Loading />


  return (
    <Layout>
      <div className="flex justify-center">
        <table className="w-full">
          <thead className="text-left">
            <tr className="border-b">
              {['Nome', 'Palavras'].map(title => {
                return (
                  <th key={title} className="p-2">
                    {title}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {books?.map(book => {
              return (
                <tr key={book.id}>
                  <td className="p-2">
                    {book.name}
                  </td>
                  <td>
                    {book._count?.words}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Form
          books={books}
          setBooks={setBooks}
        />
      </div>
    </Layout>
  )
}