import { fetchActivities } from "../api";
import { Activity } from "./Activity";
import { useQuery } from "react-query";

export const App = () => {
  const matchGroups = document.cookie.match(/access_token=(.*)(;|$)/);

  if (matchGroups) {
    // logged in
    const result = useQuery("activities", fetchActivities);
    const { isLoading, data: activities } = result;

    if (isLoading) return "Loading...";
    if (activities) {
      return (
        <div>
          {activities.map((a) => (
            <Activity key={a.id} id={a.id} />
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
