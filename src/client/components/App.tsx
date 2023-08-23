import { fetchActivities } from "../api";
import { Activity } from "./Activity";
import { useQuery } from "react-query";

export const App = () => {
  let loggedIn = false;
  const matchGroups = document.cookie.match(/access_token=(.*)(;|$)/);

  if (matchGroups) {
    loggedIn = true;
  }

  const result = useQuery("activities", fetchActivities);
  const { isLoading, error, data: activities } = result;

  if (isLoading) return "Loading...";

  if (error || !loggedIn)
    return (
      <div>
        Would you like to <a href="/stravaAuth">Log in?</a>
      </div>
    );

  if (activities) {
    return (
      <div>
        {activities.map((a) => (
          <Activity key={a.id} id={a.id} name={a.name} />
        ))}
      </div>
    );
  }
};
