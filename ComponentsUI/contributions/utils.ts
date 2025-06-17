import { Contribution } from '@/app/store/storeModels';
import { DateTime } from 'luxon';

export function sortContributions(contributionOne: Contribution, contributionTwo: Contribution): number {
  const dateA =
    typeof contributionOne.date === 'string' ? DateTime.fromISO(contributionOne.date) : contributionOne.date;
  const dateB =
    typeof contributionTwo.date === 'string' ? DateTime.fromISO(contributionTwo.date) : contributionTwo.date;

  return dateB.toMillis() - dateA.toMillis();
}

export function upperCaseFirstLetter(word: string) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1, word.length - 1)}`;
}
