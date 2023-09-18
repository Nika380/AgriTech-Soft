export const inputs = [
  {
    id: 1,
    name: "cultureName",
    type: "text",
    placeholder: "მაგ. კახეთს ვენახები",
    errorMessage:
      "ტექსტი უნდა შეადგენდეს მინიმუმ 2 და მაქსიმუმ 30 ასოს და არ უნდა შეადგენდეს სიმბოლოს",
    label: "კულტურის დასახელება",
    pattern: "^[A-Za-z0-9ა-ჰ]{2,30}$",
    required: true,
  },
  {
    id: 2,
    name: "squareMetre",
    type: "number",
    placeholder: "მაგ. 1400",
    label: "ფართი",
    // errorMessage: "მიუთითეთ კვადრატული მეტრი",
    //pattern: "^(0|[0-9]d*)$",
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
    pattern: "^[A-Za-z0-9ა-ჰ]{2,30}$",
    required: true,
  },
];
