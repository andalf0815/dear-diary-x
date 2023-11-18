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

  if (response.ok) {
    console.log('yuhu');
  }
}
