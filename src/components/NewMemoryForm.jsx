import { useState } from 'react';

function NewMemory() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`flex flex-col items-center w-full ${isActive ? 'border-2' : ''} group ${isActive ? 'is-active' : ''}`}
    >
      <input
        onFocus={() => setIsActive(true)}
        type='text'
        placeholder='Add new memory'
        className='w-60 border-2 rounded-md'
      />
      <div
        onClick={() => setIsActive(false)}
        className='rotate-45 text-lg absolute right-10 cursor-pointer group-[:not(.is-active)]:hidden'
      >
        +
      </div>
      <div>
        <div className='w-80 h-0 group-[.is-active]:h-60'></div>
      </div>
    </div>
  );
}

export default NewMemory;
