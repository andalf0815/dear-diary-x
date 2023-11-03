function TagGroup(props) {
  return (
    <div>
      <h1>TagGroup</h1>
      <input
        type='text'
        placeholder='Add a new tag'
        onKeyDown={(event) => {
          if (event.key === 'Enter' && event.target.value.trim()) {
            props.onAddTag && props.onAddTag(event.target.value);
            event.target.value = '';
          }
        }}
        className='input-underline'
      />
      <div className='tags flex gap-2 overflow-auto'>
        {props.tags.map((tag, index) => (
          <span key={index} className='flex items-center my-1 border rounded-full bg-slate-100 px-2'>
            {tag}
            <button onClick={() => props.onRemoveTag && props.onRemoveTag(index)} className='ml-2 cursor-pointer'>
              &#x2715;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagGroup;
