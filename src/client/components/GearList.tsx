import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DetailedActivity, SummaryGear } from "../stravaApi/api";

type GearProps = {
  selectedGearId?: string;
};

export const GearList: React.FC<GearProps> = ({ selectedGearId }) => {
  const qc = useQueryClient();

  // we define a gearList query here. It's synchronous because it only looks at the cached
  // data for previously fetched activityDetail
  const { data: gearList } = useQuery<Map<string, SummaryGear>>({
    queryKey: ["gearList"],
    queryFn: () => {
      // console.log("calculating gearList");
      const gearMap = new Map();
      const results = qc.getQueriesData<DetailedActivity>({
        queryKey: ["activityDetail"],
      });

      for (const [, activity] of results) {
        if (activity?.gear) {
          gearMap.set(activity.gear.id, activity.gear);
        }
      }

      return Promise.resolve(gearMap);
    },
  });

  return (
    <div>
      {gearList &&
        [...gearList.values()].map((gear) => (
          <div key={gear.id}>
            <input
              type="radio"
              value={gear.id}
              title="hey"
              checked={gear.id === selectedGearId}
            />
            <label>{gear.name}</label>
          </div>
        ))}
    </div>
  );
};
