export default function formatDate(date) {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, 0);
  const month = (newDate.getMonth() + 1).toString().padStart(2, 0);
  const year = newDate.getFullYear();

  const hour = newDate.getHours().toString().padStart(2, 0);
  const minute = newDate.getMinutes().toString().padStart(2, 0);

  const formattedDate = `${day}/${month}/${year} - ${hour}:${minute}`;
  return formattedDate;
}
