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

// TODO: probably doesnt properly throw
export async function udpateActivity(activity: Partial<StravaActivity>) {
    return fetch("update_activity", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
    }).then(res => res.json());
}