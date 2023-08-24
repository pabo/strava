import { PlainTextInput } from "./PlainTextInput";
import { fetchActivityDetail } from "../api";
import { GearList } from "./GearList";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type ActivityProps = {
  id: number;
};

export const Activity: React.FC<ActivityProps> = ({ id }) => {
  const qc = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["activityDetail", id],
    queryFn: async () => {
      try {
        const result = await fetchActivityDetail(id);
        qc.invalidateQueries({ queryKey: ["gearList"] });
        return Promise.resolve(result);
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  // TODO: is there a better way for defaults?
  const { name = "", description = "", gear = {} } = data || {};

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
      <GearList selectedGearId={gear?.id} />
      <hr />
    </div>
  );
};
