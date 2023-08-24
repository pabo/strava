import { PlainTextInput } from "./PlainTextInput";
import { fetchActivityDetail } from "../api";
import { Gear } from "./Gear";
import { SummaryGear } from "../stravaApi/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type ActivityProps = {
  id: number;
};

export const Activity: React.FC<ActivityProps> = ({ id }) => {
  console.log("rendering activity");

  const { isLoading, data } = useQuery({
    queryKey: ["activityDetail", id],
    queryFn: () => {
      console.log("running queryfn for activityDetail");
      return fetchActivityDetail(id);
    },
    staleTime: 5 * 60 * 1000,
  });

  // TODO: is there a better way for defaults?
  const { name = "", description = "", gear = {} } = data || {};

  const { id: gearId = "no id" } = gear;

  if (gear) {
    const qc = useQueryClient();
    qc.setQueryData(
      ["gearList"],
      (gearList: Map<string, SummaryGear> | undefined) => {
        console.log("updater function.");
        console.log("old gearList", gearList);
        console.log("new gear", gearList);

        if (gearList) {
          return new Map(gearList).set(gear.id || "no id", gear);
        }
        return new Map<string, SummaryGear>();
      },
    );
  }

  return (
    <div>
      <h1>
        <PlainTextInput text={name} fieldName="name" id={id} />
      </h1>
      {isLoading ? (
        "loading..."
      ) : (
        <PlainTextInput text={description} fieldName="description" id={id} />
      )}
      <Gear id={gearId} />
      <hr />
    </div>
  );
};
