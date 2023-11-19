export async function fetchMemories() {
  const response = await fetch('/api/memories');
  const data = await response.json();

  return data;
}

export async function saveMemory(data) {
  const response = await fetch('/api/memories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save memory');
  }

  return response.json();
}

export async function deleteMemory(memoryId) {
  const response = await fetch(`/api/memories/${memoryId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete memory');
  }

  return memoryId;
}
