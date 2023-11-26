import { useEffect, useState } from 'react';

import { fetchMemories } from '../services/apiMemoriesService';

import MemoryCardsSection from '../components/MemoryCardsSection';
import NewMemoryForm from '../components/NewMemoryForm';

function Dashboard() {
  const [memories, setMemories] = useState([]); // State which contains all memories
  const [memoryToEdit, setMemoryToEdit] = useState(null); // State which contains the memory to edit
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    (async function () {
      const loadedMemories = await fetchMemories();
      setMemories(loadedMemories);
    })();
  }, []);

  const handleAddMemory = (newMemory) => {
    // Check if the memory id is already available, if yes update it in the state
    // Otherwise create a new one
    const memoryWithSameId = memories.find((memory) => memory._id === newMemory._id);
    if (memoryWithSameId) {
      setMemories((oldMemories) =>
        oldMemories.map((memory) => (memory._id === newMemory._id ? newMemory : memory))
      );
      return;
    }
    setMemories((oldMemories) => [...oldMemories, newMemory]);
  };

  const handleEditMemory = (memoryToUpdate) => {
    setMemoryToEdit(memoryToUpdate);
  };

  const handleFormVisibility = (status) => {
    setIsFormActive(status);
  };

  return (
    <>
      <NewMemoryForm
        onAddMemory={handleAddMemory}
        memoryToEdit={memoryToEdit}
        onEditMemory={handleEditMemory}
        onSetFormVisibility={handleFormVisibility}
        isFormVisible={isFormActive}
      />
      <MemoryCardsSection
        memories={memories}
        onDeleteMemory={(memoryId) =>
          setMemories((oldMemories) => oldMemories.filter((memory) => memory._id !== memoryId))
        }
        onEditMemory={handleEditMemory}
        onSetFormVisibility={handleFormVisibility}
      />
    </>
  );
}

export default Dashboard;
