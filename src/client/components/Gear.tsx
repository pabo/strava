import { useQuery } from "@tanstack/react-query";
import { SummaryGear } from "../stravaApi/api";

type GearProps = {
  id: string;
};

export const Gear: React.FC<GearProps> = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["gearList"],
  });

  const gearList: Map<string, SummaryGear> = data;

  // TODO: is there a better way for defaults?
  // const { name = "", description = "" } = data || {};

  return (
    <div>
      Selected gear:
      {gearList.get(id).name}
    </div>
  );
};
