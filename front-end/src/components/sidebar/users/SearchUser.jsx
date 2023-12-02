import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import CreateChat from './Modals/CreateChat';

const SearchUser = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="p-1 w-full">
          <Input size="md" variant="standard" label="Search" />
        </div>
        <div
          className="rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <MdAdd />
        </div>
      </div>
      {open && <CreateChat open={open} setOpen={setOpen} />}
    </>
  );
};

export default SearchUser;
