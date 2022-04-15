export function convertToDate(item) {
  const today = new Date(item.dt * 1000);
  const sunrise = new Date(item.sunrise * 1000);
  const sunset = new Date(item.sunset * 1000);
  const moonrise = new Date(item.moonrise * 1000);
  const moonset = new Date(item.moonset * 1000);

  const twelveHours = today.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return { sunrise, sunset, moonrise, moonset, today, twelveHours };
}
