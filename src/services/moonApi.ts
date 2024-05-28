import { Event } from "@/types";

const phaseInfo = [
  {
    title: "Moon phase: New moon",
    icon: "🌚",
    description: "New moon phase",
  },
  {
    title: "Moon phase: New moon",
    icon: "🌓",
    description: "First quarter moon phase",
  },
  {
    title: "Moon phase: Full moon",
    icon: "🌕",
    description: "Full moon phase",
  },
  {
    title: "Moon phase: Last quarter",
    icon: "🌗",
    description: "Last quarter moon phase",
  },
];

const getMoonEvents = async (): Promise<Event[]> => {
  const year = new Date().getFullYear();

  const url = `https://craigchamberlain.github.io/moon-data/api/moon-phase-data/${year}/index.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.map((item: any) => {
      const phaseData = phaseInfo[item.Phase];
      return {
        id: Date.now() + Math.random(),
        icon: phaseData.icon,
        title: phaseData.title,
        description: phaseData.description,
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
