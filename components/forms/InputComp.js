import React from "react";

export const InputComp = ({}) => {
  return (
    <input
      id="event-name"
      name="event-name"
      type="text"
      className="block max-w-lg w-full shadow-sm focus:ring-antiqueBlue-500 focus:border-antiqueBlue-500 sm:text-sm border border-gray-300 rounded-md"
      required
      value={eventName}
      onChange={(e) => setEventName(e.target.value)}
    />
  );
};

export function NameForm(props) {
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName,
  } = useInput("");
  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName,
  } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${firstName} ${lastName}`);
    resetFirstName();
    resetLastName();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" {...bindFirstName} />
      </label>
      <label>
        Last Name:
        <input type="text" {...bindLastName} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
