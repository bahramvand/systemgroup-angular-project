import userRole from "./user-role";

type userType = {
  id: number;
  firstName: string;
  lastName: string;
  role: userRole;
  nationalId: string;
  mobile: string;
  username: string;
};

export default userType;
