'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../../components/ui/dialog';
import { Plus } from 'lucide-react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { BookInterface } from '../../pages/Book';
import { api } from '../../utils/axios';

interface Props {
  books: BookInterface[];
  setBooks: Dispatch<SetStateAction<BookInterface[]>>;
}

export function Form({ books, setBooks }: Props) {
  const [book, setBook] = useState({} as BookInterface);
  const [open, setOpen] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    api.post('/books', book).catch((error) => {
      console.log(error);
      alert('Erro ao cadastrar o livro');
      location.reload();
    });

    setBooks([
      ...books,
      {
        ...book,
        id: new Date().valueOf(),
        _count: {
          words: 0,
        },
      },
    ]);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="fixed p-3 bg-gray-500 rounded-full bottom-7 right-5 hover:bg-gray-400">
        <Plus size={25} />
      </DialogTrigger>
      <DialogContent className="text-white bg-gray-700">
        <DialogHeader>
          <DialogTitle>Informações do Livro </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-3 font-bold text-gray-100 bg-gray-500 rounded placeholder:text-gray-300"
            placeholder="Nome"
            value={book?.name ?? ''}
            name="nome"
            onChange={(event) => setBook({ ...book, name: event.target.value })}
          />
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
