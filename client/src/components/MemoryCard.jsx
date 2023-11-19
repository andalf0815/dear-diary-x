import { DateTime } from 'luxon';
import { MdDelete } from 'react-icons/md';
import { deleteMemory } from '../services/apiMemoriesService';

function MemoryCard(props) {
  const memory = props.memory;

  const today = DateTime.now().startOf('day');
  const memoryDate = DateTime.fromISO(memory.memoryDate).startOf('day');
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

  return (
    <div id='memory-container' className='max-w-[60rem] min-w-[50%] lg:min-w-full p-3 snap-start'>
      <div id='memory' className='flex flex-col h-[20rem] p-4 border-slate-400 border-2 rounded-md shadow-lg'>
        <div id='memory-header' className='flex justify-between'>
          <p>
            {timeAgoText ? `${timeAgoText} on ` : ''} {memory.memoryDate}
          </p>
          <div id='memory-functions' className='flex'>
            <MdDelete
              className='text-red-700 text-2xl cursor-pointer'
              onClick={async () => {
                try {
                  await deleteMemory(memory._id);
                  return props.onDeleteMemory && props.onDeleteMemory(memory._id);
                } catch (error) {
                  console.error(error);
                }
              }}
            />
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
