export function calculateAge(birthDate) {
  const birthDateObj = new Date(birthDate);
  const currentDate = new Date();
  const timeDifference = currentDate - birthDateObj;
  const ageInYears = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24 * 365.25)
  );

  return ageInYears;
}
