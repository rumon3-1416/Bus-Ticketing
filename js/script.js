const availableSeats = document.getElementById('available-seats');
const selectedSeats = document.getElementById('selected-seats');
const seats = document.getElementById('seats');
const selectedDetails = document.getElementById('selected-details');
const totalPriceNumber = document.getElementById('totalPrice');
const grandTotalNumber = document.getElementById('grandTotal');

const couponInput = document.getElementById('coupon-input');
const couponBtn = document.getElementById('coupon-btn');
const pName = document.getElementById('name');
const pNumber = document.getElementById('number');
const emailId = document.getElementById('email');

let totalPrice = 0;
let reachedMax = false;

seats.addEventListener('click', function (event) {
  const eTarget = event.target;

  if (eTarget.localName === 'button') {
    if (eTarget.classList.value.includes('selected-seat')) {
      eTarget.classList.remove('selected-seat');
      eTarget.classList.add('bg-[#F7F8F8]');

      addRemoveSeat(eTarget.innerText, 'remove');

      totalPrice -= 550;
    } else {
      if (reachedMax) {
        alert('You have selected maximum seats.');
      } else {
        eTarget.classList.remove('bg-[#F7F8F8]');
        eTarget.classList.add('selected-seat');

        addRemoveSeat(eTarget.innerText, 'add');

        totalPrice += 550;
      }
    }
    totalPriceNumber.innerText = totalPrice;
    grandTotalNumber.innerText = totalPrice;
  }
});

function addRemoveSeat(seat, action) {
  if (action === 'add') {
    const seatDetails = document.createElement('div');
    seatDetails.classList.add(seat, 'pb-6', 'flex', 'justify-between');
    seatDetails.innerHTML = `
    <p>${seat}</p>
    <p>Economy</p>
    <p>550</p>
`;
    selectedDetails.appendChild(seatDetails);

    incDecNum(availableSeats, 'dec');
    incDecNum(selectedSeats, 'inc');
  } else if (action === 'remove') {
    const currentSeat = document.querySelector('.' + seat);

    selectedDetails.removeChild(currentSeat);

    incDecNum(availableSeats, 'inc');
    incDecNum(selectedSeats, 'dec');
  }

  if (Number(selectedSeats.innerText) >= 4) {
    reachedMax = true;
    couponInput.removeAttribute('disabled', false);
    couponBtn.removeAttribute('disabled', false);
  } else {
    reachedMax = false;
    couponInput.setAttribute('disabled', true);
    couponBtn.setAttribute('disabled', true);
  }
}

function incDecNum(currentNum, action) {
  currentNum.innerText =
    action === 'inc'
      ? Number(currentNum.innerText) + 1
      : action === 'dec' && Number(currentNum.innerText) - 1;
}

couponBtn.addEventListener('click', function () {
  let totalNumber = Number(totalPriceNumber.innerText);

  if (couponInput.value === 'NEW') {
    grandTotalNumber.innerText = totalNumber - totalNumber * 0.15;
  } else if (couponInput.value === 'Couple') {
    grandTotalNumber.innerText = totalNumber - totalNumber * 0.2;
  }

  couponInput.value = '';
});
