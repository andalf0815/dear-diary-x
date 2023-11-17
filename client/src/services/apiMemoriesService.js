export async function fetchMemories() {
    const response = await fetch ("/api/memories");
    const data = await response.json();

    return data;
}