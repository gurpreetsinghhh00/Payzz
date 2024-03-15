import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserBalance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBalance(response.data.balance);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching balance");
    }
  };

  useEffect(() => {
    fetchUserBalance();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Appbar />
      <div className="p-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
