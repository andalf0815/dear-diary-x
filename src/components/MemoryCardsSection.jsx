import MemoryCard from './MemoryCard';

function MemoryCardsSection(props) {
  console.log(props.memories);
  return (
    <section className='flex flex-row justify-between w-full overflow-auto snap-mandatory snap-x'>
      {props.memories.map((memory) => (
        <MemoryCard memory={memory} />
      ))}
    </section>
  );
}

export default MemoryCardsSection;
