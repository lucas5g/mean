import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../ui/dialog';
import { Plus } from 'lucide-react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { WordInterface } from '../../pages/Word';
import { api } from '../../utils/axios';
import { BookInterface } from '../../pages/Book';

interface Props {
  words: WordInterface[];
  setWords: Dispatch<SetStateAction<WordInterface[]>>;
  books: BookInterface[];
}

export function Form({ words, setWords, books }: Props) {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState({} as WordInterface);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    word.fixed = false;
    api.post('/words', word).catch((error) => {
      if (error.response.status !== 400) {
        console.log(error);
        alert('Erro ao criar palavra');
      }
      alert(error.response.data.message);
      window.location.reload();
    });

    const newListWords = [
      ...words,
      {
        ...word,
        id: new Date().valueOf(),
      },
    ];

    setWords(newListWords);

    setWord({} as WordInterface);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="fixed p-3 bg-gray-500 rounded-full bottom-7 right-5 hover:bg-gray-400">
        <Plus size={25} />
      </DialogTrigger>
      <DialogContent className="text-white bg-gray-700">
        <DialogHeader>
          <DialogTitle>Informações da Palavra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-3 font-bold text-gray-100 bg-gray-500 rounded placeholder:text-gray-300"
            placeholder="Nome"
            value={word?.name}
            name="name"
            onChange={(event) => setWord({ ...word, name: event.target.value })}
          />

          <textarea
            name="meaning"
            className="w-full p-3 font-bold text-gray-200 bg-gray-500 rounded h-36 placeholder:text-gray-300"
            placeholder="Significado"
            value={word?.meaning}
            onChange={(event) =>
              setWord({ ...word, meaning: event.target.value })
            }
          ></textarea>
          <select
            name="bookId"
            className="w-full p-3 font-bold text-gray-100 bg-gray-500 rounded placeholder:text-gray-300"
            value={word?.bookId}
            onChange={(event) =>
              setWord({ ...word, bookId: Number(event.target.value) })
            }
            required
          >
            <option value="">Livros</option>
            {books.map((book) => {
              return (
                <option
                  key={book.id}
                  value={book.id}
                  className="p-3 optional:bg-green-600"
                >
                  {book.name}
                </option>
              );
            })}
          </select>

          <footer className="flex justify-end space-x-3">
            <DialogClose
              className="w-24 h-10 font-bold text-gray-500 bg-gray-200 border-gray-800 rounded hover:bg-gray-100"
              type="reset"
            >
              Cancelar
            </DialogClose>
            <button className="w-24 h-10 font-bold bg-gray-900 rounded hover:bg-gray-950">
              Cadastrar
            </button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
