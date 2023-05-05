
function setValidationTags() {
  const $input = document.getElementById('birthdate');
  $input.max = new Date().toISOString().split('T')[0];
}
  
setValidationTags();
    