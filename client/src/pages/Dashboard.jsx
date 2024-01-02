import { useEffect, useRef, useState } from 'react';

import { fetchMemories } from '../services/apiMemoriesService';

import MemoryCardsSection from '../components/MemoryCardsSection';
import NewMemoryForm from '../components/NewMemoryForm';

function Dashboard() {
  //****************//
  //***USE STATES***//
  //****************//

  const [memories, setMemories] = useState([]); // State which contains all memories
  const [memoryToEdit, setMemoryToEdit] = useState(null); // State which contains the memory to edit
  const [isFormActive, setIsFormActive] = useState(false); // State which handles the visibility of the form component
  const [shouldScrollToMostLeftCard, setShouldScrollToMostLeftCard] = useState(false);

  const cardsSectionRef = useRef(null);

  //*****************//
  //***USE EFFECTS***//
  //*****************//

  // Useeffect for changes in memories
  useEffect(() => {
    (async function () {
      const loadedMemories = await fetchMemories();
      setMemories(loadedMemories);
    })();
  }, []);

  // Useeffect for shouldScrollToMostLeftCard (New added memory)
  useEffect(() => {
    if (shouldScrollToMostLeftCard && cardsSectionRef.current) {
      // set a small timeout so that the new memory card is created and then it gets scrolled to most left card
      setTimeout(() => {
        cardsSectionRef.current.scrollLeft = 0;
      }, 200);
      setShouldScrollToMostLeftCard(false);
    }
  }, [shouldScrollToMostLeftCard]);

  //*****************//
  //***HANDLE FCTS***//
  //*****************//

  const handleAddMemory = (newMemory) => {
    const sortMemoriesByDate = (memoriesArray) =>
      memoriesArray.sort((a, b) => new Date(b.memoryDate) - new Date(a.memoryDate));

    const existingMemoryIndex = memories.findIndex((memory) => memory._id === newMemory._id);

    if (existingMemoryIndex !== -1) {
      // Update an already existing memory
      const updatedMemories = memories.map((memory, index) => (index === existingMemoryIndex ? newMemory : memory));
      setMemories(sortMemoriesByDate(updatedMemories));
    } else {
      // Create a new memory and add it to the state
      const updatedMemories = sortMemoriesByDate([...memories, newMemory]);
      setShouldScrollToMostLeftCard(true); // Scroll to the most left card
      setMemories(updatedMemories);
    }
  };

  const handleEditMemory = (memoryToUpdate) => {
    setMemoryToEdit(memoryToUpdate);
  };

  const handleFormVisibility = (status) => {
    setIsFormActive(status);
  };

  //*********//
  //***JSX***//
  //*********//

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
        cardsSectionRef={cardsSectionRef}
      />
    </>
  );
}

export default Dashboard;
