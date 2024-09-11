'use client';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [toDos, setToDos] = useState<string[]>([]);

  const keyHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setToDos([inputValue, ...toDos]);
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={keyHandle}
        />

        <Table>
          <TableBody>
            {toDos.map((x, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{x}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
