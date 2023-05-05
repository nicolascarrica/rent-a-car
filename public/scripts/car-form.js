function setValidationTags() {
    const $input = document.getElementById('year');
    $input.max = new Date().getFullYear();
  }
  
  setValidationTags();