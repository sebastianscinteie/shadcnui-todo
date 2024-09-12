'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [toDos, setToDos] = useState<string[]>([]);

  const [checkBoxList, setCheckBoxList] = useState<boolean[]>([]);

  const keyHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      setToDos([inputValue, ...toDos]);
      setCheckBoxList([false, ...checkBoxList]);
      setInputValue('');
    }
  };

  const checkHandle = (checked: CheckedState, index: number) => {
    const clone = [...checkBoxList];
    clone[index] = checked as boolean;
    setCheckBoxList(clone);
  };

  const clearHandle = () => {
    setToDos([]);
    setCheckBoxList([]);
    setInputValue('');
  };

  const xButtonHandle = (index: number) => {
    const toDosCopy = [...toDos];
    toDosCopy.splice(index, 1);
    const checkBoxListCopy = [...checkBoxList];
    checkBoxListCopy.splice(index, 1);

    setToDos(toDosCopy);
    setCheckBoxList(checkBoxListCopy);
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
            {[...toDos].map((x, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Checkbox
                    checked={checkBoxList[index]}
                    onCheckedChange={(event) => checkHandle(event, index)}
                  ></Checkbox>
                </TableCell>
                <TableCell
                  className={`font-medium  ${
                    checkBoxList[index] ? 'line-through' : ''
                  }`}
                >
                  {x}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => xButtonHandle(index)}
                  >
                    <span className="sr-only">Close menu</span>

                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {toDos.length !== 0 ? (
          <Button onClick={clearHandle}>Clear</Button>
        ) : null}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
