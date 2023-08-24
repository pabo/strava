import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { StravaActivity, fetchActivityDetail, udpateActivity } from "../api";

type ActivityProps = {
  id: number;
};

const PlainTextInput: React.FC<{
  text: string;
  fieldName: keyof StravaActivity;
  id: number;
}> = ({ id, text, fieldName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  //TODO: cant destructure this or it breaks?
  const qc = useQueryClient();

  const { mutate } = useMutation(
    (activity: Partial<StravaActivity>) => {
      setIsDisabled(true);
      return udpateActivity(activity);
    },
    {
      onSuccess: (data) => {
        qc.setQueryData(["activityDetail", id], data);
        setIsDisabled(false);
        setIsEditing(false);
      },
    },
  );

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (text !== e.target.value) {
      mutate({ [fieldName]: e.target.value, id });
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <textarea
        autoFocus
        cols={80}
        defaultValue={text}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
      />
    );
  }

  return <div onClick={handleClick}>{text}</div>;
};

export const Activity: React.FC<ActivityProps> = ({ id }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["activityDetail", id],
    queryFn: () => fetchActivityDetail(id),
    staleTime: 5 * 60 * 1000,
  });

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
