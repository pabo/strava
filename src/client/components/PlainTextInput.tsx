import { useState } from "react";
import { udpateActivity } from "../api";
import { DetailedActivity } from "../stravaApi/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const PlainTextInput: React.FC<{
  text: string;
  fieldName: keyof DetailedActivity;
  id: number;
}> = ({ id, text, fieldName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // TODO: cant destructure this or it breaks?
  const qc = useQueryClient();

  const { mutate } = useMutation(
    (activity: Partial<DetailedActivity>) => {
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
    setIsEditing(false);
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
