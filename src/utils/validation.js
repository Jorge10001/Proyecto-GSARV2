function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateInstitutionalEmail(value) {
  return /^[^\s@]+@uleam\.edu\.ec$/i.test(value);
}
