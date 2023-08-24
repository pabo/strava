import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DetailedActivity, SummaryGear } from "../stravaApi/api";

type GearProps = {
  selectedGearId?: string;
  mutateActivityDetail: (activity: Partial<DetailedActivity>) => void;
};

export const GearList: React.FC<GearProps> = ({
  selectedGearId,
  mutateActivityDetail,
}) => {
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

  const handleChange = (gear: SummaryGear) => {
    // hoka g13654207
    // NB g14341023

    // TODO: strava generated api has fields like gearId, but the actual names that their API accepts are like gear_id
    // need to figure out how to rectify that
    mutateActivityDetail({ gear_id: gear.id });
  };

  return (
    <div>
      {gearList &&
        [...gearList.values()].map((gear) => {
          return (
            <div key={gear.id}>
              <input
                type="radio"
                value={gear.id}
                title="hey"
                checked={gear.id === selectedGearId}
                onChange={() => handleChange(gear)}
              />
              <label>{gear.name}</label>
            </div>
          );
        })}
    </div>
  );
};
