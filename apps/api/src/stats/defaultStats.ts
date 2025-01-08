import { Statistic, BasicStats } from "@repo/schemas";

/**
 * The default stats that are available to be calculated from the get-go (and will be calculated initially).
 */
const defaultStats: Statistic[] = [
  {
    id: "72A8BFC4-13BA-4AEA-AC47-69442ECFEC96",
    name: "Basic Stats",
    description:
      "the basics, like the same stuff that MAL shows on your profile",
    calculate: () => {
      // TODO: Implement this (in a separate file of course)
      return new Promise((resolve) => {
        setTimeout(() => {
          const val: BasicStats = {
            grandTotalDuration: 0,
            totalDuration: 0,
            totalAnime: 0,
            totalEpisodes: 0,
            rewatchedAnime: 0,
            rewatchedEpisodes: 0,
            rewatchedDuration: 0,
            totalMovies: 0,
            totalOVA: 0,
            totalONA: 0,
            totalSpecial: 0,
            totalTV: 0,
            totalMusic: 0,
            totalPV: 0,
            totalTVSpecial: 0,
            totalCM: 0,
            averageScore: 0,
            completed: {
              count: 0,
              totalDuration: 0,
              averageScore: 0,
            },
            dropped: {
              count: 0,
              totalDuration: 0,
              averageScore: 0,
            },
            onHold: {
              count: 0,
              totalDuration: 0,
              averageScore: 0,
            },
            planToWatch: {
              count: 0,
              totalDuration: 0,
            },
            watching: {
              count: 0,
              totalDuration: 0,
              averageScore: 0,
            },
          };

          resolve(val);
        }, 250);
      });
    },
  },
];
