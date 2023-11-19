import { useEffect, useState } from 'react';

import { fetchMemories } from '../services/apiMemoriesService';

import MemoryCardsSection from '../components/MemoryCardsSection';
import NewMemoryForm from '../components/NewMemoryForm';

function Dashboard() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    (async function () {
      const loadedMemories = await fetchMemories();
      setMemories(loadedMemories);
    })();
  }, []);

  return (
    <>
      <NewMemoryForm onAddMemory={(newMemory) => setMemories((oldMemories) => [...oldMemories, newMemory])} />
      <MemoryCardsSection
        memories={memories}
        onDeleteMemory={(memoryId) =>
          setMemories((oldMemories) => oldMemories.filter((memory) => memory._id !== memoryId))
        }
      />
    </>
  );
}

export default Dashboard;
