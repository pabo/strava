import { PlainTextInput } from "./PlainTextInput";
import { fetchActivityDetail, udpateActivity } from "../api";
import { GearList } from "./GearList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DetailedActivity } from "../stravaApi/api";

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

  const { mutate: mutateActivityDetail } = useMutation(
    (activity: Partial<DetailedActivity>) =>
      udpateActivity({ id, ...activity }),
    {
      onSuccess: (data) => {
        qc.setQueryData(["activityDetail", id], data);
      },
    },
  );

  // TODO: is there a better way for defaults?
  const { name = "", description = "", gear = {} } = data || {};

  return (
    <div>
      <h1>
        <PlainTextInput
          text={name}
          fieldName="name"
          mutateActivityDetail={mutateActivityDetail}
        />
      </h1>
      {isLoading ? (
        "loading..."
      ) : (
        <PlainTextInput
          text={description}
          fieldName="description"
          mutateActivityDetail={mutateActivityDetail}
        />
      )}
      <GearList
        selectedGearId={gear?.id}
        mutateActivityDetail={mutateActivityDetail}
      />
      <hr />
    </div>
  );
};
