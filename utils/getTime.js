const getTime = () => {
  const timestamp = Date.now();

  // Format the timestamp to a local date and time string for Mumbai (IST)
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', // Mumbai timezone
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false, // Use 24-hour format
  }).format(timestamp);
};

module.exports = getTime;
