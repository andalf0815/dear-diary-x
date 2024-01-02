export async function fetchMemories() {
  try {
    const response = await fetch('/api/memories');
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function addMemory(formData) {
  try {
    const response = await fetch('/api/memories', {
      method: 'POST',
      body: formData,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateMemory(data) {
  try {
    const response = await fetch(`/api/memories`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteMemory(memoryId) {
  try {
    const response = await fetch(`/api/memories/${memoryId}`, {
      method: 'DELETE',
    });

    return memoryId;
  } catch (error) {
    throw error;
  }
}
