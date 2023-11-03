const TagGroup = React.memo((props) => {
  return (
    <div>
      <h1>TagGroup</h1>
      <input
        type='text'
        placeholder='Add a new tag'
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            props.onAddTag && props.onAddTag(event.target.value);
          }
        }}
        className='input-underline'
      />
      <div className='tags'>
        {props.tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
});

export default TagGroup;
