import { useState } from "react";
import { DetailedActivity } from "../stravaApi/api";

export const PlainTextInput: React.FC<{
  text: string;
  fieldName: keyof DetailedActivity;
  mutateActivityDetail: (activity: Partial<DetailedActivity>) => void;
}> = ({ text, fieldName, mutateActivityDetail }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(false);

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
      mutateActivityDetail({ [fieldName]: e.target.value });
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
        // disabled={isDisabled}
      />
    );
  }

  return <div onClick={handleClick}>{text}</div>;
};
