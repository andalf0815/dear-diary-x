import { useState } from 'react';
import MemoryCardsSection from '../components/MemoryCardsSection';
import NewMemoryForm from '../components/NewMemoryForm';

import { v4 as uuidv4 } from 'uuid';

const exampleMemory = [
  {
    id: uuidv4(),
    title: 'My title',
    favorite: true,
    memoryDate: '2023-11-04',
    emotion: '😎',
    description: 'Lorem ipsum blabla',
    activityTags: ['sleeping', 'eating'],
    locationTags: ['@Home'],
    peopleTags: ['Me'],
  },
  {
    id: uuidv4(),
    title: 'My title 2',
    favorite: true,
    memoryDate: '2023-11-05',
    emotion: '😎',
    description: 'Lorem ipsum blabla',
    activityTags: ['sleeping', 'eating'],
    locationTags: ['@Home'],
    peopleTags: ['Me'],
  },
];

function Dashboard() {
  const [memories, setMemories] = useState(exampleMemory || []);
  console.log(memories);
  return (
    <>
      <NewMemoryForm
        onAddMemory={(newMemory) => {
          setMemories((oldMemories) => [...oldMemories, newMemory]);
        }}
      />
      <MemoryCardsSection memories={memories} />
    </>
  );
}

export default Dashboard;
