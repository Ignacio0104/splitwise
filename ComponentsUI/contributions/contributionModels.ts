import { Contribution, ReportUserData } from '@/app/store/storeModels';
import { DateTime } from 'luxon';

export interface ContributionDisplay {
  contributionData: Contribution[];
  userInformation: ReportUserData;
}
