import { List } from '@/components/List';

export default async function Home() {
  const res = await fetch('http://localhost:3000/api', {
    next: { revalidate: 5 },
  });

  const words = await res.json();

  return (
    <main className="p-10 space-y-12">
      <List words={words} />
    </main>
  );
}
