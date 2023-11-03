import { useState } from 'react';
import MemoryCardsSection from '../components/MemoryCardsSection';
import NewMemoryForm from '../components/NewMemoryForm';

function Dashboard() {
  const [memories, setMemories] = useState('');

  return (
    <>
      <NewMemoryForm
        onAddMemory={(newMemory) => {
          setMemories((oldMemories) => [...oldMemories, { newMemory }]);
        }}
      />
      <MemoryCardsSection memories={memories} />
    </>
  );
}

export default Dashboard;
