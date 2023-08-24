import { useQuery } from "react-query";

import { PlainTextInput } from "./PlainTextInput";
import { fetchActivityDetail } from "../api";

type ActivityProps = {
  id: number;
};

export const Activity: React.FC<ActivityProps> = ({ id }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["activityDetail", id],
    queryFn: () => fetchActivityDetail(id),
    staleTime: 5 * 60 * 1000,
  });

  // TODO: is there a better way for defaults?
  const { name = "", description = "" } = data || {};

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
      <hr />
    </div>
  );
};
