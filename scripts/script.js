  const checkBoxButton = document.querySelector('.language-switch-button');
  const checkButtonArray = checkBoxButton.querySelectorAll('.check-button');

checkBoxButton.addEventListener('click', () => {
  checkButtonArray.forEach(elem => {
    console.log(elem);
    console.log(elem.classList.contains('isChecked'));
    elem.classList.toggle('isChecked');
    console.log(elem);
  });
});