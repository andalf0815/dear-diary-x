import { DateTime } from 'luxon';
import { MdDelete, MdEdit } from 'react-icons/md';
import { deleteMemory } from '../services/apiMemoriesService';

function MemoryCard(props) {
  const memory = props.memory;

  // Calculate the difference between today and the memory date
  const today = DateTime.now().startOf('day');
  let memoryDate = DateTime.fromISO(memory.memoryDate).startOf('day');
  const diffInDays = today.diff(memoryDate, 'days').toObject().days;
  const diffInYears = today.diff(memoryDate, 'years').toObject().years;

  let timeAgoText = '';

  if (diffInDays <= 1) {
    // Check if today or yesterday
    timeAgoText = `${diffInDays < 1 ? 'Today' : 'Yesterday'}`;
  } else if (diffInDays === 7) {
    timeAgoText = '1 week ago';
  } else if (diffInDays < 8) {
    // Check if the current week
    timeAgoText = `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else if (today.minus({ months: 1 }).hasSame(memoryDate, 'day')) {
    // Check if exactly a month ago
    timeAgoText = '1 month ago';
  } else if (diffInYears >= 1 && today.minus({ years: Math.floor(diffInYears) }).hasSame(memoryDate, 'day')) {
    // Check if one or more whole years
    timeAgoText = Math.floor(diffInYears) + ` year${diffInYears !== 1 ? 's' : ''} ago`;
  } else {
    timeAgoText = '';
  }

  // Format the memoryDate in a better human readable format
  memoryDate = memoryDate.toFormat('yyyy-MM-dd');

  const handleDeleteClick = async () => {
    if (!confirm('Do you really want to delete the memory?')) return;
    try {
      await deleteMemory(memory._id);
      props.onDeleteMemory && props.onDeleteMemory(memory._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMemory = () => {
    props.onEditMemory && props.onEditMemory(memory);
    props.onSetFormVisibility && props.onSetFormVisibility(true);
  };

  return (
    <div id='memory-container' className='max-w-[60rem] min-w-[50%] lg:min-w-full p-3 snap-start'>
      <div id='memory' className='flex flex-col h-[20rem] p-4 border-slate-400 border-2 rounded-md shadow-lg'>
        <div id='memory-header' className='flex justify-between'>
          <p>
            {timeAgoText ? `${timeAgoText} on ` : ''} {memoryDate}
          </p>
          <div id='memory-functions' className='flex'>
            <MdEdit className='text-blue-700 text-2xl cursor-pointer' onClick={handleEditMemory} />
            <MdDelete className='text-red-700 text-2xl cursor-pointer' onClick={handleDeleteClick} />
          </div>
        </div>
        <h1>
          {memory.emotion} {memory.title}
        </h1>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <p>{memory.description}</p>
            <div className='flex'>
              <p>
                {memory.activityTags.map(
                  (tag, index) => `${tag} ${index !== memory.activityTags.length - 1 ? '| ' : ''}`
                )}
              </p>
            </div>
            <div className='flex'>
              <p>
                {' '}
                {memory.locationTags.map(
                  (tag, index) => `${tag} ${index !== memory.locationTags.length - 1 ? '| ' : ''}`
                )}
              </p>
            </div>
            <div className='flex'>
              <p>
                {' '}
                {memory.peopleTags.map((tag, index) => `${tag} ${index !== memory.peopleTags.length - 1 ? '| ' : ''}`)}
              </p>
            </div>
          </div>
          <div className='flex flex-col'>
            <div>Picture</div>
            <div>Picture</div>
            <div>Picture</div>
            <div>Picture</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;
