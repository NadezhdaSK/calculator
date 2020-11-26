"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Все текстовые инпуты
    const property = document.querySelector('#property'),
          anInitialFee = document.querySelector('#an-initial-fee'),
          creditTerm = document.querySelector('#credit-term'),
          inputsText = document.querySelectorAll('.data-input');

    // Все range инпуты
    const propertyRange = document.querySelector('#property-range'),
          anInitialFeeRange = document.querySelector('#an-initial-fee-range'),
          creditTermRange = document.querySelector('#credit-term-range'),
          inputsRange = document.querySelectorAll('.data-range');

    // Итоговые суммы
    const amountOfCredit = document.querySelector('#amount-of-credit'),
          monthlyPayment = document.querySelector('#monthly-payment'),
          recommendedIncome = document.querySelector('#recommended-income');

    // Кнопки-банки
    const banksBtn = document.querySelectorAll('.bank');    

    // Кнопки с процентными ставками

    const banks = [
        {
            name: 'alfa',
            percent: 8.7
        },
        {
            name: 'sber',
            percent: 8.4
        },
        {
            name: 'pochta',
            percent: 7.9
        },
        {
            name: 'tinkoff',
            percent: 9.2
        }
    ];

    let interestRate = banks[0].percent;

    banksBtn.forEach(bank => {
        bank.addEventListener('click', () => {
            banksBtn.forEach(item => {
                item.classList.remove('bank--active');
            });

            
            const bankName = bank.dataset.bank;
            interestRate = banks.find(item => item.name === bankName).percent;
            bank.classList.add('bank--active');
            calculation();
        }); 
    });

    // Приравнивание значений range и текстовых инпутов

    const assignValueRange = () => {
        property.value = propertyRange.value;
        anInitialFee.value = anInitialFeeRange.value;
        creditTerm.value = creditTermRange.value;
    };

    const assignValueInput = () => {
        propertyRange.value = property.value;
        anInitialFeeRange.value = anInitialFee.value;
        creditTermRange.value = creditTerm.value;
    };

    inputsRange.forEach(input => {
        input.addEventListener('input', () => {
            assignValueRange();
            calculation();
        });
    });
    
    inputsText.forEach(input => {
        input.addEventListener('input', () => {
            assignValueInput();
            calculation();
        });
    });

    // Итоговые суммы

    const calculation = () => {
        /* 
            СК = сумма кредита
            КМ = количество месяцев
            КС = кредитная ставка
            ЕП = ежемесяный платеж

            ЕП = (СК + (((СК * ПС) \ 100) \ 12) * КМ) \ КМ

        */

        let totalAmountOfCredit = property.value - anInitialFee.value;
        let numberOfMonths = creditTerm.value * 12;

        let monthlyPaymentNumber = Math.round((totalAmountOfCredit + (((totalAmountOfCredit * interestRate) / 100) / 12) * numberOfMonths) / numberOfMonths);
        
        if (monthlyPaymentNumber < 0) {
            return false;
        } else {
            amountOfCredit.textContent = `${totalAmountOfCredit}₽`;
            monthlyPayment.textContent = `${monthlyPaymentNumber}₽`;
            recommendedIncome.textContent = `${monthlyPaymentNumber + (monthlyPaymentNumber * 35) / 100}₽`;
        }
    };
});