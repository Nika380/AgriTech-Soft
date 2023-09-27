export const inputs = [
  {
    id: 1,
    name: "cultureName",
    type: "text",
    placeholder: "მაგ. კახეთს ვენახები",
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
