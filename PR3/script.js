/* Задание 1 */
function CountLetters(str, letter) 
{
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === letter) {
      count++;
    }
  }
  return count;
}

function getRow(firstRow, secondRow) 
{
  const letterToCount = 'а';
  const countInFirstRow = CountLetters(firstRow, letterToCount);
  const countInSecondRow = CountLetters(secondRow, letterToCount);

  if (countInFirstRow > countInSecondRow) 
  {
    alert(firstRow + '(' + countInFirstRow + ')');
  } 
  else if (countInSecondRow > countInFirstRow) 
  {
    alert(secondRow + '(' + countInSecondRow + ')');
  } 
  else 
  {
    alert("Количество букв одинаково в обоих строках");
  }
}

const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

console.log(firstRow);
console.log(secondRow);
getRow(firstRow, secondRow);

/* Задание 2 */
function formattedPhone(phone) 
{
  const cleanPhone = phone.replace(/\D/g, '');
  const match = cleanPhone.match(/^(7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) 
  {
    const [, , region, firstPart, secondPart, thirdPart] = match;
    alert(`+7 (${region}) ${firstPart}-${secondPart}-${thirdPart}`);
	console.log('Принят ' + phone + ' возвращен: ' + `+7 (${region}) ${firstPart}-${secondPart}-${thirdPart}`)
  } 
  else 
  {
    alert("Неверный формат номера телефона");
  }
}
formattedPhone('+79211234567'); 
formattedPhone('79211234567');
formattedPhone('89211234567');
formattedPhone('9211234567');
formattedPhone('test');