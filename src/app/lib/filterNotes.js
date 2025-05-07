export function filterNotesBySearch(notes, search) {
  const lowerSearch = search.toLocaleLowerCase("tr");
  return notes.filter(note => {
    return (
      note.title.toLocaleLowerCase("tr").includes(lowerSearch) ||
      note.tags.toLocaleLowerCase("tr").includes(lowerSearch)
    );
  });
}
