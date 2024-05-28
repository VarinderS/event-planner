import { Event } from "@/types";

const phases = ["🌚", "🌓", "🌕", "🌗"];

const getMoonEvents = async (): Promise<Event[]> => {
  const year = new Date().getFullYear();

  const url = `https://craigchamberlain.github.io/moon-data/api/moon-phase-data/${year}/index.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.map((item: any) => {
      const phase = phases[item.Phase];
      return {
        id: Date.now() + Math.random(),
        title: "Moon Phase",
        description: phase,
        startDate: item.Date,
        endDate: item.Date,
      };
    });
  } catch (error) {
    console.error("Failed to fetch moon events:", error);
    return [];
  }
};

export { getMoonEvents };
