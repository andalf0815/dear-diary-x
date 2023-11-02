import { signal } from '@preact/signals-react';

const isActive = signal(false);

function NewMemoryForm() {
  return (
    <div
      className={`flex flex-col items-center w-full ${isActive.value ? 'border-2' : ''} group ${isActive.value ? 'is-active' : ''}`}
    >
      <input
        onFocus={() => isActive.value = true}
        type='text'
        placeholder='Add new memory'
        className='w-60 border-2 rounded-md'
      />
      <div
        onClick={() => isActive.value = false}
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

export default NewMemoryForm;
