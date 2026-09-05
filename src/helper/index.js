export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );
};

