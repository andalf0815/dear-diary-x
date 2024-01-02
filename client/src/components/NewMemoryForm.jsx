import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

import { addMemory, updateMemory } from '../services/apiMemoriesService';

import TagGroup from './TagGroup';
import EmotionRadioButton from './EmotionRadioButton';

function NewMemoryForm(props) {
  const MAX_IMG_SIZE_KB = import.meta.env.VITE_MAX_IMG_SIZE_KB; // Maximum image size to upload in kilobytes
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

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Initialize the memory with an empty object
  const initializedMemoryObject = {
    title: '',
    favorite: false,
    memoryDate: getCurrentDate(),
    emotion: '',
    description: '',
    activityTags: [],
    locationTags: [],
    peopleTags: [],
  };

  //****************//
  //***USE STATES***//
  //****************//

  const [newMemory, setNewMemory] = useState(initializedMemoryObject); // State for the memory object
  const [isEditing, setIsEditing] = useState(false); // State if the form is in edit or creation mode

  //*****************//
  //***USE EFFECTS***//
  //*****************//

  useEffect(() => {
    if (props.memoryToEdit) {
      setIsEditing(true);
      setNewMemory({
        ...props.memoryToEdit,
        memoryDate: props.memoryToEdit.memoryDate.substring(0, 10), // Bring the date format to yyy-mm-dd
      });
    } else {
      setIsEditing(false);
      setNewMemory(initializedMemoryObject);
    }
  }, [props.memoryToEdit]);

  //*****************//
  //***HELPER FCTS***//
  //*****************//

  const validateForm = () => {
    return newMemory.title && newMemory.memoryDate && newMemory.emotion;
  };

  //*****************//
  //***HANDLE FCTS***//
  //*****************//

  const handleFavoriteClick = () => {
    setNewMemory((prevMemory) => ({ ...prevMemory, favorite: !prevMemory.favorite }));
  };

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

  const handleSaveClick = async () => {
    if (validateForm()) {
      const isUpdate = newMemory._id ? true : false;
      const memoryToSave = { ...newMemory };
      const formData = new FormData();

      try {
        // Create new Memory
        if (!isUpdate) {
          memoryToSave._id = uuidv4(); // Add an _id prop if its a new memory

          // Add the states props in the formData which is then send to the server
          Object.keys(memoryToSave).forEach((key) => {
            if (key === 'images') {
              memoryToSave.images.forEach((image) => {
                formData.append('image', image);
              });
            } else {
              formData.append(key, memoryToSave[key]);
            }
          });

          const response = await addMemory(formData);

          if (response.status === 409) {
            alert('Memory on this date already exists!');
            return;
          } else if (!response.ok) {
            alert('There was a problem with saving the memory!');
            return;
          }
        } else {
          // Update existing Memory
          const response = await updateMemory(memoryToSave);

          if (!response.ok) {
            alert('There was a problem with updating the memory!');
            return;
          }
        }
        props.onAddMemory && props.onAddMemory(memoryToSave);
        setNewMemory(initializedMemoryObject);
        handleFormVisibility(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please fill out at least date, title and a emotion!');
    }
  };

  const handleClearClick = () => {
    setNewMemory(initializedMemoryObject);
    props.onEditMemory && props.onEditMemory(null);
  };

  const handleFormVisibility = (status) => {
    props.onSetFormVisibility && props.onSetFormVisibility(status);
  };

  const handleCloseClick = () => {
    handleFormVisibility(false);
    handleClearClick();
  };

  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;
    let uploadedImages = [];

    // Ensure only up to 4 images are selected
    for (let i = 0; i < Math.min(selectedFiles.length, 4); i++) {
      const file = selectedFiles[i];
      const fileSizeKB = file.size / 1024; // Get file size in kilobytes

      // Allow only a max size of MAX_IMG_SIZE_KB
      if (fileSizeKB <= MAX_IMG_SIZE_KB) {
        uploadedImages.push(file);
      } else {
        alert(`File '${file.name}' exceeds the maximum allowed size of ${MAX_IMG_SIZE_KB}KB.`);
        break;
      }
    }

    setNewMemory({ ...newMemory, images: uploadedImages });
  };

  //*********//
  //***JSX***//
  //*********//

  return (
    <div className='flex flex-col items-center justify-center w-full h-24'>
      <input
        id='title'
        value={newMemory.title}
        type='text'
        placeholder='Add new memory'
        className='absolute top-16 z-10 w-60 text-xl input-underline'
        onFocus={() => handleFormVisibility(true)}
        onChange={(event) => {
          setNewMemory((prevMemory) => ({ ...prevMemory, title: event.target.value }));
        }}
        onBlur={(event) => {
          setNewMemory((prevMemory) => ({ ...prevMemory, title: event.target.value.trim() }));
        }}
      />
      <div
        className={`absolute top-12 flex flex-col items-center w-[500px] pt-16 border-2 rounded-md shadow-lg ${
          props.isFormVisible ? 'block is-active' : 'hidden'
        } ${isEditing ? 'border-blue-400 bg-blue-50' : 'border-green-400 bg-green-50'} sm:w-11/12`}
      >
        <span
          id='close-new-memory-form'
          className='rotate-45 text-lg absolute top-0 right-2 cursor-pointer'
          onClick={handleCloseClick}
        >
          +
        </span>
        <div className='flex flex-col gap-2 w-full h-full p-5'>
          <button id='favorite' onClick={handleFavoriteClick}>
            {newMemory.favorite ? 'Favorite' : 'No Favorite'}
          </button>
          <input
            id='memory-date'
            value={newMemory.memoryDate}
            type='date'
            className='input-underline w-40'
            onChange={(event) => {
              setNewMemory((prevMemory) => ({ ...prevMemory, memoryDate: event.target.value }));
            }}
          />
          <div id='emotions' className='flex h-10 overflow-x-auto overflow-y-hidden'>
            {emotions.map((emotion, index) => (
              <EmotionRadioButton
                key={index}
                onSelectedEmotion={(emotion) => {
                  setNewMemory((prevMemory) => ({ ...prevMemory, emotion: emotion }));
                }}
                selected={emotion === newMemory.emotion}
                emotion={emotion}
                index={index}
              />
            ))}
          </div>
          <label htmlFor='memory-description' className='text-sm'>
            Details
          </label>
          <textarea
            id='memory-description'
            value={newMemory.description}
            placeholder='Tell something about your day'
            rows='5'
            className=' input-underline rounded-lg border-2 focus:border-blue-500'
            onChange={(event) => {
              setNewMemory((prevMemory) => ({ ...prevMemory, description: event.target.value }));
            }}
            onBlur={(event) => {
              setNewMemory((prevMemory) => ({ ...prevMemory, description: event.target.value.trim() }));
            }}
          ></textarea>
          {/* Tags */}
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
          {/* Image upload */}
          <div>
            <input type='file' accept='image/*' multiple onChange={handleImageChange} />
            <div className='flex justify-between'>
              {newMemory.images?.map((image, index) => (
                <img key={index} src={image} alt={`Uploaded Image ${index + 1}`} className='w-24 h-24 m-1' />
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2 px-5'>
            <button
              onClick={handleSaveClick}
              className='rounded-full p-2 bg-blue-500 text-white focus:outline-none hover:bg-blue-600 active:bg-blue-700'
            >
              Save
            </button>
            <button
              onClick={handleClearClick}
              className='rounded-full p-2 bg-red-500 text-white focus:outline-none hover:bg-red-600 active:bg-red-700'
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMemoryForm;
