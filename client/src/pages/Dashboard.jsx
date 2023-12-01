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

  let isFirstRender = true; // Flag to check if it's the first render of the component

  //*****************//
  //***USE EFFECTS***//
  //*****************//

  useEffect(() => {
    if (isFirstRender) {
      (async function () {
        const loadedMemories = await fetchMemories();
        setMemories(loadedMemories);
      })();
    } else {
      // Order the memories according to the date desc
      setMemories((oldMemories) => [...oldMemories].sort((a, b) => new Date(b.memoryDate) - new Date(a.memoryDate)));
    }
  }, [memories]);

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
    // Check if the memory id is already available, if yes update it in the state
    // Otherwise create a new one
    const memoryWithSameId = memories.find((memory) => memory._id === newMemory._id);
    if (memoryWithSameId) {
      setMemories((oldMemories) => oldMemories.map((memory) => (memory._id === newMemory._id ? newMemory : memory)));
      return;
    }
    setMemories((oldMemories) => [...oldMemories, newMemory]);
    setShouldScrollToMostLeftCard(true); // Scroll to the most left card
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
