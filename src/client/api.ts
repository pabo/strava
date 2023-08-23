export type StravaActivity = {
    id: number;
    name: string;
    description: string;
};

// generic fetch support for react-query which adds throwing
async function _fetch(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network reponse not ok");
    }
  
    return response.json();
}

export async function fetchActivities(): Promise<StravaActivity[]> {
    return _fetch("/last_activities");
}
  
export async function fetchActivityDetail(id: number): Promise<StravaActivity> {
    return _fetch(`/activities/${id}`);
}
  