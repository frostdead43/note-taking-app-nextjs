"use server";



export async function createNote(currentState,formData) {
  const formObj = Object.fromEntries(formData);
  console.log(formObj);
}
