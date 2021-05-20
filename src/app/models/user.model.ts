export interface User {
  id: string;
  email: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  nickname: string | null;
  isScouter: boolean;
  isAdmin: boolean;
  isBeneficiary: boolean;
}
