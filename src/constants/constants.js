export const inputs = [
  {
    id: 1,
    name: "cultureName",
    type: "text",
    placeholder: "მაგ. კახეთის ვენახები",
    errorMessage:
      "ტექსტი უნდა შეადგენდეს მინიმუმ 2 და მაქსიმუმ 30 ასოს და არ უნდა შეადგენდეს სიმბოლოს",
    label: "კულტურის დასახელება",
    pattern: "^[A-Za-z0-9ა-ჰ ]{2,30}$",
    required: true,
  },
  {
    id: 2,
    name: "squareMeter",
    type: "number",
    placeholder: "მაგ. 1400",
    label: "ფართი",
    errorMessage: "მიუთითეთ კვადრატული მეტრი",
    pattern: "^[1-9]\\d*$",
    required: true,
    min: 1,
  },
  {
    id: 3,
    name: "location",
    type: "text",
    placeholder: "მაგ. კახეთი",
    errorMessage:
      "ტექსტი უნდა შეადგენდეს მინიმუმ 2 და მაქსიმუმ 30 ასოს და არ უნდა შეადგენდეს სიმბოლოს",
    label: "ადგილმდებარეობა",
    pattern: "^[A-Za-z0-9ა-ჰ ]{2,30}$",
    required: true,
  },
];

export const addCultureAction = [
  {
    id: 1,
    name: "taskName",
    type: "text",
    placeholder: "სახელი",
    errorMessage: "სახელწოდების მითითება აუცილებელია",
    label: "სახელი",
    pattern: "^[A-Za-z0-9ა-ჰ ]{1,30}$",
    required: true,
  },
  {
    id: 2,
    name: "taskType",
    select: true,
    placeholder: "თანხა",
    errorMessage: "მიუთითეთ ხარჯის ტიპი",
    label: "შემოსავლის",
    required: true,
  },
  {
    id: 3,
    name: "price",
    type: "number",
    placeholder: "თანხა",
    errorMessage: "თანხის მითითება სავალდებულოა",
    label: "თანხა",
    pattern: "^\\d+$",
    required: true,
    min: 0,
  },
];

export const inputs2 = [
  {
    id: 1,
    name: "userName",
    type: "text",
    placeholder: "User name",
    errorMessage:
      "Username should be 3-16 characters and shouldn`t include any special characters!",
    label: "User name",
    pattern: "^[A-Za-z0-9ა-ჰ]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage:
      "It should be a valid email addres and should matched gmail.com!",
    label: "Email",
    pattern: "[a-zA-Z0-9._+-]+[a-zA-Z0-9]+@gmail.com",
    required: true,
  },
  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 leter,  1 number and 1 special character! ",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
];
