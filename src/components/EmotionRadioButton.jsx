function EmotionRadioButton({ onSelectedEmotion, selected, emotion, index }) {
  return (
    <>
      <div className={`option ${selected ? 'bg-slate-500' : ''}`}>
        <input
          id={`emotion-${index}`}
          type='radio'
          name='emotions'
          value={emotion}
          className='sr-only'
          checked={selected}
          onChange={() => onSelectedEmotion && onSelectedEmotion(emotion)}
        />
        <label htmlFor={`emotion-${index}`} className='label'>
          {emotion}
        </label>
      </div>
    </>
  );
}

export default EmotionRadioButton;
