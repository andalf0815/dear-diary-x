import { signal } from '@preact/signals-react';
import TagGroup from './TagGroup';

const isActive = signal(false);

function NewMemoryForm() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-24'>
      <input
        onFocus={() => (isActive.value = true)}
        type='text'
        placeholder='Add new memory'
        className='absolute top-20 z-10 w-60 input-underline'
      />
      <div
        className={`absolute top-16 flex flex-col items-center w-4/6 h-[550px] pt-20 bg-white border-2 rounded-md shadow-lg ${
          isActive.value ? 'block is-active' : 'hidden'
        } group sm:w-11/12`}
      >
        <span
          onClick={() => (isActive.value = false)}
          className='rotate-45 text-lg absolute top-0 right-2 cursor-pointer group-[:not(.is-active)]:hidden'
        >
          +
        </span>
        <div className='w-full h-full px-5'>
          <div className='flex justify-between'>
            <input type='date' className='input-underline' />
            <button>Favorite</button>
          </div>
          <div>
            <span className='cursor-pointer'>😁</span>
            <span className='cursor-pointer'>😁</span>
            <span className='cursor-pointer'>😁</span>
            <span className='cursor-pointer'>😁</span>
            <span className='cursor-pointer'>😁</span>
            <span className='cursor-pointer'>😁</span>
          </div>
          <textarea
            placeholder='Tell something about your day'
            rows='5'
            className='input-underline w-full'
          ></textarea>
          <div>
            <TagGroup />
            <TagGroup />
            <TagGroup />
          </div>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}

export default NewMemoryForm;
