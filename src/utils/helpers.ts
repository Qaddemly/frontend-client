export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const validateDateOfBirth = (value: string) => {
  const inputYear = value.split("-")[0];
  const inputMonth = value.split("-")[1];
  const inputDay = value.split("-")[2];
  const currentYear = getCurrentDate().split("-")[0];
  const currentMonth = getCurrentDate().split("-")[1];
  const currentDay = getCurrentDate().split("-")[2];

  if (inputYear > currentYear) return "date is not correct";
  else if (inputMonth > currentMonth) return "date is not correct";
  else if (inputDay > currentDay) return "date is not correct";
  else return true;
};

export const validateStartToEndDate = (
  value: string,
  endEducationDate: string,
) => {
  const endYear = endEducationDate.split("-")[0];
  const endMonth = endEducationDate.split("-")[1];
  const endDay = endEducationDate.split("-")[2];
  const startYear = value.split("-")[0];
  const startMonth = value.split("-")[1];
  const startDay = value.split("-")[2];
  if (startYear > endYear) return "date is not correct";
  if (startYear === endYear && startMonth > endMonth)
    return "date is not correct";
  if (startYear === endYear && startDay > endDay) return "date is not correct";
  else return true;
};

export const createFormData = (data: Record<string, unknown>) => {
  const formData = new FormData();

  const appendToFormData = (key: string, value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendToFormData(`${key}[${index}]`, item);
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        appendToFormData(`${key}[${nestedKey}]`, nestedValue);
      });
    } else {
      formData.append(key, String(value));
    }
  };
  Object.entries(data).forEach(([key, value]) => {
    appendToFormData(key, value);
  });

  return formData;
};
