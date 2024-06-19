import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//#region shadcn imports
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

//#endregion

import { AppDispatch } from "@/redux/store/store";
import { getCurrentUser } from "@/redux/slices/userSlice";
// import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import UserCard from "./UserCard";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  // const auth = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getCurrentUser());
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [dispatch, axiosPrivate]);

  const [selectedChartView, setSelectedChartView] = useState("barchart");

  const toggleChartView = (view: string) => {
    setSelectedChartView(view);
  };

  return (
    <div className="pt-[6rem] flex justify-center items-center flex-col gap-5">
      <div>
        <UserCard />
      </div>

      <div className="p-5">
        <RadioGroup className="flex gap-5" defaultValue="barchart">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="barchart"
              id="barchart"
              onClick={() => {
                toggleChartView("barchart");
              }}
            />
            <Label htmlFor="barchart" className="text-base cursor-pointer">
              Bar Chart
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="piechart"
              id="piechart"
              onClick={() => {
                toggleChartView("piechart");
              }}
            />
            <Label htmlFor="piechart" className="text-base cursor-pointer ">
              Pie Chart
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="">
        {selectedChartView === "barchart" ? <BarChart /> : <PieChart />}
      </div>
    </div>
  );
};

export default UserProfile;
