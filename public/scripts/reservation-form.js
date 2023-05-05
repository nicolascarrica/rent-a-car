function setDateValidation(){
    const finishDate = document.querySelector('#finish-date');
    const startDate = document.querySelector('#start-date');

    startDate.max = finishDate.value;
    finishDate.min = startDate.value;

    startDate.addEventListener('change', (e) => {
        finishDate.min = e.target.value;
    });
    finishDate.addEventListener('change', (e) =>{
        startDate.max = e.target.value;
    });

}

setDateValidation();