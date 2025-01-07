import IStat from "./IStat"

/**
 * The default stats that are available to be calculated from the get-go (and will be calculated initially).
 */
const defaultStats: IStat[] = [
  {
    id: "72A8BFC4-13BA-4AEA-AC47-69442ECFEC96",
    name: "Basic Stats",
    description: "the basics, like the same stuff that MAL shows on your profile",
    calculate: () => {
      // TODO: Implement this
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    },
  },
]
