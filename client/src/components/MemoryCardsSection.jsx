import { DateTime } from 'luxon';
import MemoryCard from './MemoryCard';

function MemoryCardsSection(props) {
  const filteredMemories = filterDates(props.memories);

  function filterDates(memories) {
    const today = DateTime.now().startOf('day');

    return memories.filter((memory) => {
      const memoryDate = DateTime.fromISO(memory.memoryDate).startOf('day');

      // Check if within one week
      const isWithinOneWeek = today.diff(memoryDate, 'days').days <= 7;

      // Check if exactly one month ago
      const isOneMonthAgo = today.minus({ months: 1 }).hasSame(memoryDate, 'day');

      // Check if exactly one or more whole years ago
      const diffInYears = today.diff(memoryDate, 'years').years;
      const isExactlyYearsAgo =
        diffInYears >= 1 && today.minus({ years: Math.floor(diffInYears) }).hasSame(memoryDate, 'day');

      return isWithinOneWeek || isOneMonthAgo || isExactlyYearsAgo;
    });
  }

  return (
    <section className='flex flex-row justify-between w-full overflow-auto snap-mandatory snap-x'>
      {filteredMemories.map((memory) => (
        <MemoryCard key={memory._id} memory={memory} onDeleteMemory={props.onDeleteMemory} />
      ))}
    </section>
  );
}

export default MemoryCardsSection;
