import { fetchActivities } from "../api";
import { Activity } from "./Activity";
import { useQuery } from "@tanstack/react-query";

export const App = () => {
  console.log("rendering app");

  const matchGroups = document.cookie.match(/access_token=(.*)(;|$)/);

  if (matchGroups) {
    // logged in

    const result = useQuery(["activities"], () => {
      console.log("running queryfn for activities");
      return fetchActivities();
    });
    const { isLoading, data: activities } = result;

    if (isLoading) return "Loading...";
    if (activities) {
      return (
        <div>
          {activities.map(({ id = 0 }) => (
            <Activity key={id} id={id} />
          ))}
        </div>
      );
    }
  }

  return (
    <div>
      Would you like to <a href="/stravaAuth">Log in?</a>
    </div>
  );
};
