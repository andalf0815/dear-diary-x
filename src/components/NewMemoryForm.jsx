import { signal } from '@preact/signals-react';

const isActive = signal(false);

function NewMemoryForm() {
  return (
    <div className='flex justify-center w-full h-24'>
      <div
        className={`absolute flex flex-col items-center w-4/6 rounded-md shadow-lg ${
          isActive.value ? 'h-[550px] border-2 bg-white is-active' : 'relative h-0'
        } group sm:w-11/12`}
      >
        <input
          onFocus={() => (isActive.value = true)}
          type='text'
          placeholder='Add new memory'
          className='w-60 border-b-2 mt-2 focus:border-b-slate-500 focus:outline-none'
        />
        <div
          onClick={() => (isActive.value = false)}
          className='rotate-45 text-lg absolute right-2 cursor-pointer group-[:not(.is-active)]:hidden'
        >
          +
        </div>

        <div className='w-full h-full'></div>
      </div>
    </div>
  );
}

export default NewMemoryForm;
