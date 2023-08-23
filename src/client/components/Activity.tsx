import { useQuery } from "react-query";
import { fetchActivityDetail } from "../api";

type ActivityProps = {
  id: number;
  name: string;
  description?: string;
};

export const Activity: React.FC<ActivityProps> = ({ id, name: title }) => {
  const { isLoading, data } = useQuery(["activityDetail", id], () =>
    fetchActivityDetail(id),
  );

  return (
    <div>
      <h1>
        {title} (id:{id})
      </h1>
      <p>{isLoading ? "Description is loading..." : data?.description}</p>
    </div>
  );
};
