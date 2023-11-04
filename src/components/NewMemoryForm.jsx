import { useEffect, useState } from 'react';
import TagGroup from './TagGroup';
import EmotionRadioButton from './EmotionRadioButton';

function NewMemoryForm() {
  const [newMemory, setNewMemory] = useState({
    id: '',
    title: '',
    favorite: '',
    emotion: '',
    description: '',
    activityTags: [],
    locationTags: [],
    peopleTags: [],
  });

  const emotions = [
    '😀',
    '😅',
    '😇',
    '😈',
    '😌',
    '😍',
    '😎',
    '😑',
    '😓',
    '😔',
    '😕',
    '😢',
    '😭',
    '😴',
    '😵',
    '🤪',
    '🤬',
    '🤯',
    '🤮',
    '🤒',
    '🤕',
  ];
  const [isActive, setIsActive] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const handleAddTag = (type, tag) => {
    setNewMemory((prevMemory) => {
      const updatedTags = prevMemory[type] ? [...prevMemory[type], tag] : [tag];
      return {
        ...prevMemory,
        [type]: updatedTags,
      };
    });
  };

  const handleRemoveTag = (type, indexToRemove) => {
    setNewMemory((prevMemory) => {
      const updatedTags = prevMemory[type].filter((_, index) => index !== indexToRemove);
      return {
        ...prevMemory,
        [type]: updatedTags,
      };
    });
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-24'>
      <input
        onFocus={() => setIsActive(true)}
        type='text'
        placeholder='Add new memory'
        className='absolute top-20 z-10 w-60 text-xl input-underline'
      />
      <div
        className={`absolute top-16 flex flex-col items-center w-4/6 pt-20 bg-white border-2 rounded-md shadow-lg ${
          isActive ? 'block is-active' : 'hidden'
        } group sm:w-11/12`}
      >
        <span
          onClick={() => setIsActive(false)}
          className='rotate-45 text-lg absolute top-0 right-2 cursor-pointer group-[:not(.is-active)]:hidden'
        >
          +
        </span>
        <div className='flex flex-col gap-6 w-full h-full p-5'>
          {/* <div className='flex justify-between'> */}
            <button>Favorite</button>
            <input type='date' className='input-underline' />
          {/* </div> */}
          <div className='emotions flex h-10 overflow-x-auto overflow-y-hidden'>
            {emotions.map((emotion, index) => (
              <EmotionRadioButton
                key={index}
                onSelectedEmotion={(emotion) => {
                  console.log(emotion);
                  setSelectedEmotion(emotion);
                }}
                selected={emotion === selectedEmotion}
                emotion={emotion}
                index={index}
              />
            ))}
          </div>
          <label htmlFor='memory-description' className='text-sm'>Details</label>
          <textarea
            id='memoryDescription'
            placeholder='Tell something about your day'
            rows='5'
            className=' input-underline rounded-lg border-2 focus:border-blue-500'
          ></textarea>
          <div className='flex flex-col gap-3'>
            <TagGroup
              tagTitle='Activities'
              tags={newMemory.activityTags}
              onAddTag={(tag) => handleAddTag('activityTags', tag)}
              onRemoveTag={(index) => handleRemoveTag('activityTags', index)}
            />
            <TagGroup
              tagTitle='Locations'
              tags={newMemory.locationTags}
              onAddTag={(tag) => handleAddTag('locationTags', tag)}
              onRemoveTag={(index) => handleRemoveTag('locationTags', index)}
            />
            <TagGroup
              tagTitle='People'
              tags={newMemory.peopleTags}
              onAddTag={(tag) => handleAddTag('peopleTags', tag)}
              onRemoveTag={(index) => handleRemoveTag('peopleTags', index)}
            />
          </div>
          <button className=' rounded-full p-2 bg-blue-500 text-white focus:outline-none hover:bg-blue-600 active:bg-blue-700'>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewMemoryForm;
