import MemoryCard from './MemoryCard';

function MemoryCardsSection() {
  return (
    <section className='flex flex-row justify-between w-full overflow-auto snap-mandatory snap-x'>
      <MemoryCard />
      <MemoryCard />
      <MemoryCard />
    </section>
  );
}

export default MemoryCardsSection;
