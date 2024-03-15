import Button from "./Button";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-1">
      <div className="flex justify-center items-center gap-2">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center">
          <div className="flex flex-col justify-center h-full text-lg">
            {user?.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full items-center">
          <div>
            {user?.firstName} {user?.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={(e) => {
            navigate(
              "/transfer?id=" +
                user._id +
                "&name=" +
                user.firstName +
                " " +
                user.lastName
            );
          }}
        >
          Send Money
        </Button>
      </div>
    </div>
  );
};

export default User;
