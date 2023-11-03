import { useEffect, useState } from 'react';
import TagGroup from './TagGroup';
import EmotionRadioButton from './EmotionRadioButton';

function NewMemoryForm() {
  const [newMemory, setNewMemory] = useState({});

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

  // useEffect(() => {
  //   console.log(newMemory);
  // },[newMemory])

  return (
    <div className='flex flex-col items-center justify-center w-full h-24'>
      <input
        onFocus={() => setIsActive(true)}
        type='text'
        placeholder='Add new memory'
        className='absolute top-20 z-10 w-60 input-underline'
      />
      <div
        className={`absolute top-16 flex flex-col items-center w-4/6 h-[550px] pt-20 bg-white border-2 rounded-md shadow-lg ${
          isActive ? 'block is-active' : 'hidden'
        } group sm:w-11/12`}
      >
        <span
          onClick={() => setIsActive(false)}
          className='rotate-45 text-lg absolute top-0 right-2 cursor-pointer group-[:not(.is-active)]:hidden'
        >
          +
        </span>
        <div className='w-full h-full px-5'>
          <div className='flex justify-between'>
            <input type='date' className='input-underline' />
            <button>Favorite</button>
          </div>
          <div className='emotions flex'>
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
          <textarea placeholder='Tell something about your day' rows='5' className='input-underline w-full'></textarea>
          <div>
            <TagGroup
              tags={newMemory.tags ?? []}
              onAddTag={(tag) => {
                setNewMemory((oldMemory) => {
                  const updatedTags = oldMemory.tags ? [...oldMemory.tags, tag] : [tag];
                  return {
                    ...oldMemory,
                    tags: updatedTags,
                  };
                });
              }}
            />
            {/* <TagGroup />
            <TagGroup /> */}
          </div>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}

export default NewMemoryForm;
