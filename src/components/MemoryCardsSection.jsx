import MemoryCard from './MemoryCard';

function MemoryCardsSection(props) {
  return (
    <section className='flex flex-row justify-between w-full overflow-auto snap-mandatory snap-x'>
      {props.memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </section>
  );
}

export default MemoryCardsSection;
