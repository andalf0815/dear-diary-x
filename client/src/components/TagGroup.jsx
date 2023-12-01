function TagGroup({ tagTitle, tags = [], onAddTag, onRemoveTag }) {

  //*****************//
  //***HANDLE FCTS***//
  //*****************//

  const handleAddTag  = (event) => {
    if (event.target.value.trim()) {
      onAddTag && onAddTag(event.target.value);
      event.target.value = '';
    }
  };

  //*********//
  //***JSX***//
  //*********//

  return (
    <div className='h-16'>
      <input
        type='text'
        placeholder={tagTitle}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleAddTag(event);
          }
        }}
        onBlur={HandleAddTag}
        className='input-underline w-full'
      />
      <div className='tags flex gap-2 overflow-auto'>
        {tags.map((tag, index) => (
          <span key={index} className='flex items-center my-1 border rounded-full bg-slate-100 px-2'>
            {tag}
            <button onClick={() => onRemoveTag && onRemoveTag(index)} className='ml-2 cursor-pointer'>
              &#x2715;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagGroup;
