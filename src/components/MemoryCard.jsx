function MemoryCard(props) {
  const memory = props.memory;

  const today = new Date();
  const memoryDate = new Date(memory.memoryDate);
  const diffInDays = Math.floor((today.getTime() - memoryDate.getTime()) / (1000 * 3600 * 24));

  return (
    <div id='memory-container' className='max-w-[60rem] w-1/2 lg:min-w-full p-3 snap-center'>
      <div id='memory' className='flex flex-col h-[20rem] p-4 border-slate-400 border-2 rounded-md shadow-lg'>
        <p>
          {diffInDays !== 0 ? `${diffInDays} days ago, on` : 'Today, on'} {memory.memoryDate}
        </p>
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
