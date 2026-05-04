export const getTutorials = async () => {
  const response = await fetch("/data/tutorials.json");

  if (!response.ok) {
    throw new Error("Unable to load tutorials.");
  }

  const tutorials = await response.json();

  if (!Array.isArray(tutorials)) {
    throw new Error("Tutorial data is not available.");
  }

  return tutorials;
};
