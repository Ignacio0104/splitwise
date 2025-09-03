import { Report } from "@/app/store/storeModels";

export const getAmounts = (report: Report): Map<string, number> => {
  const userMap = new Map<string, number>();
  let maxContributionAmount = 0;
  report.users.forEach((user) => {
    const total = user.contributions.reduce(
      (accumulator, currentContribution) => {
        return accumulator + currentContribution.amount;
      },
      0
    );
    userMap.set(user.userId || "", total);
    if (total > maxContributionAmount) {
      maxContributionAmount = total;
    }
  });

  userMap.set("MaxContribution", maxContributionAmount);
  return userMap;
};
