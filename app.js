// იუზერების ინფორმაცია, (mock data)
let users = [
  {
    firstName: "Natia",
    lastName: "Saghliani",
    userId: 1,
    accounts: [
      {
        accountNumber: "GE000005667",
        balance: 10000,
        accountId: 1,
      },
      {
        accountNumber: "GE000005660",
        balance: 15000,
        accountId: 2,
      },
    ],
  },
  {
    firstName: "Tiko",
    lastName: "Elashvili",
    userId: 2,
    accounts: [
      {
        accountNumber: "GE000005640",
        balance: 9000,
        accountId: 1,
      },
      {
        accountNumber: "GE000005600",
        balance: 7000,
        accountId: 2,
      },
      {
        accountNumber: "GE000005611",
        balance: 5000,
        accountId: 3,
      },
    ],
  },
];

// სახელის და გვარის ელემენტი
const fullNameElement = document.getElementById("fullName");
// ul ელემენტი, რომლის ქვეშაც უნდა დაიხატოს ანგარიშების ინფორმაცია
const accountListElement = document.getElementById("accountList");

// იუზერის ქარდზე დაჭერისას ვიძახებთ ამ ფუნცქციას.
// პარამეტრად ვაწოდებთ userId-ს, რომლის საშუალებითაც ზემოთ აღწერილ იუზერების დატაში ვპოულობთ შესაბამის იუზერს
// იუზერის პოვნის შემდეგ fullName ელემენტს ვანიჭებთ სახელის და გვარის გაერთიანებულ მნიშვნელობას
// ამის შემდეგ ვასუფთავებთ ul ელემენტის შიგთავსს, რათა იუზერების გადაცვლის შემდეგ თავიდან ავირიდოთ ინფორმაციის დუბლირება
// ბოლოს ანგარიშების ერეიზე ვზემოქმედებთ ფორიჩით, და თითოეული ექაუნთისთვის ვქმნით ქარდს და ვხატავთ HTML-ს მხარეს
function showBalance(userId) {
  const user = users.find((user) => user.userId === userId);

  fullNameElement.textContent = `${user.firstName} ${user.lastName}`;
  accountListElement.innerHTML = "";

  user.accounts.forEach((account) => {
    createBalanceElement(account, userId);
  });
}

// ეს ფუნქცია აწყობს ელემენტებს და ამატებს დომში.
// ასევე, თანხის შეტანის და გატანის ღილაკებზე ამატებს ივენთ ლისენერებს
// ივენთ ლისენეტები გვაძლევს საშუალებას კონკრეტული ანგარიშის ბალანზე მოვახდინოთ ცვლილება.
function createBalanceElement(account, userId) {
  const li = document.createElement('li');

  const userInfoDiv = document.createElement('div');
  userInfoDiv.classList.add('user-info');

  const fullNameP = document.createElement('p');
  fullNameP.classList.add('wf-bold');

  const cardDiv = document.createElement('div');
  cardDiv.classList.add('d-flex', 'flex-column', 'align-items-start', 'card', 'col-4', 'p-2', 'bg-danger-subtle', 'mb-5', 'mt-2');


  const accountNumberLabel = document.createElement('p');
  accountNumberLabel.classList.add('fw-bold');
  accountNumberLabel.textContent = 'Account Number:';

  const accountNumberValue = document.createElement('p');
  accountNumberValue.textContent = account.accountNumber;

  const balanceLabel = document.createElement('p');
  balanceLabel.classList.add('fw-bold');
  balanceLabel.textContent = 'Balance:'


  const balanceValue = document.createElement('p');
  balanceValue.textContent = account.balance;


  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'w-100');

  const balanceInput = document.createElement('input');
  balanceInput.type = 'number';
  balanceInput.classList.add('border', 'border-1', 'border-danger', 'p-1');
  
  const depositButton = document.createElement('button');
  depositButton.classList.add('btn', 'btn-success');
  depositButton.textContent = 'Deposit';

  const withdrawButton = document.createElement('button');
  withdrawButton.classList.add('btn', 'btn-danger');
  withdrawButton.textContent = 'Withdrawn';

  li.appendChild(userInfoDiv);

  userInfoDiv.appendChild(fullNameP);
  userInfoDiv.appendChild(cardDiv);

  cardDiv.appendChild(accountNumberLabel);
  cardDiv.appendChild(accountNumberValue);
  cardDiv.appendChild(balanceLabel);
  cardDiv.appendChild(balanceValue);
  cardDiv.appendChild(actionsDiv);

  actionsDiv.appendChild(balanceInput);
  actionsDiv.appendChild(depositButton);
  actionsDiv.appendChild(withdrawButton);

  accountListElement.appendChild(li);

  depositButton.addEventListener('click', () => {
    depositBalance(account.accountId, userId, balanceInput, balanceValue);
  });

  withdrawButton.addEventListener('click', () => {
    withDrawBalance(account.accountId, userId, balanceInput, balanceValue);
  });


}

// თანხის შეტანის ფუნქცია, რომელიც იუზერ აიდის საშუალებით პოულობს სასურველ იუზერს
// შემდეგ ამ იუზერის ანგარიშებში ვპოულობთ სასურველ ანგარიშს accountId-ს დახმარებით.
// ასევე ანგარიშის ქარდის შექმნის ფუნქციიდან ვაყოლებთ ბალანსის ინფუთს და ბალანსის ელემენტის რეფერენსებს
// ნაპოვნი ანგარიშის ბალასს ვამატებთ იუზერის მიერ ინფუთში შეყვანილ მნიშვნელობას.
// პირველ რიგში მნიშვნელობას ვანახლებთ ლოკალურ users დატაში, ხოლლო შემდეგ დომის მხარეს, ბალანსის ელემენტში
// ბალანსის განახლების შემდეგ ვანულებთ ინფუთის მნიშვნელობას 
function depositBalance(accountId, userId, balanceInput, balanceValue) {
  const currentUser = users.find((user) => user.userId === userId);

  const currentAccount = currentUser.accounts.find(account => account.accountId === accountId);

  currentAccount.balance = currentAccount.balance + +balanceInput.value;

  balanceValue.textContent = currentAccount.balance;

  balanceInput.value = '';

}

// ეს მუშაობს მსგავსად depositBalance ფუნქციისა
// დამატებით აკეთებს შემოწმებას, რომ მოთხოვნილი თანხა თუ აღემატება არსებულს, მაშინ ამოუგდებს ალერტს რომ თანხა არ არის საკმაისი
// თან აჩვენებს არსებულ ბალანსს,
// ხოლო თუ მოთხოვნილი თანხა ნაკლებია ან ტოლია ბალანზე არსებულს, მაშინ ბალანსი წარმატებით შეიცვლება
function withDrawBalance(accountId, userId, balanceInput, balanceValue) {
  const currentUser = users.find((user) => user.userId === userId);

  const currentAccount = currentUser.accounts.find(account => account.accountId === accountId);

  const difference = currentAccount.balance - +balanceInput.value;
  if (difference >= 0) {
    currentAccount.balance = difference;
    balanceValue.textContent = currentAccount.balance; 
    balanceInput.value = '';
  } else {
    alert('not enough balance!! available balance is ' + currentAccount.balance);
  }
}