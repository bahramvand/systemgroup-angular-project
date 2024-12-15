import userRole from './user-role';

type queryUserType = {
  id: number;
  username: string;
  role: userRole;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
  password: string;
};

export default queryUserType;
