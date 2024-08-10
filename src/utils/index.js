export const formattedDate = (dateString, options) => {
  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // timeZone: "UTC",
    // timeZoneName: "short",
  };

  return date.toLocaleDateString("en-PK", options);
};
