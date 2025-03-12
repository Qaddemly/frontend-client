import toast from "react-hot-toast";
import { IError } from "../interfaces/Common.interfaces";

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options).replace(",", "");
}

export const validateDateOfBirth = (value: string) => {
  const inputYear = value.split("-")[0];
  const inputMonth = value.split("-")[1];
  const inputDay = value.split("-")[2];
  const currentYear = getCurrentDate().split("-")[0];
  const currentMonth = getCurrentDate().split("-")[1];
  const currentDay = getCurrentDate().split("-")[2];

  console.log(inputYear, inputMonth, inputDay);
  console.log(currentYear, currentMonth, currentDay);

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
    } else if (value instanceof FileList) {
      console.log("file");
      formData.append(key, value[0]);
    } else if (typeof value === "object" && value !== null) {
      console.log("obj");
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

export function handleApiError(err: unknown) {
  const errorData = (err as { data?: IError })?.data;
  if (errorData) {
    toast.error(errorData.message);

    if (Array.isArray(errorData.details)) {
      errorData.details.forEach((detail) => toast.error(detail.msg));
    }
  } else {
    toast.error("Something went wrong!");
  }
}

export function bytesToMB(bytes: number): number {
  return bytes / (1024 * 1024);
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`;
}

export function formatDateByYearAndMonth(date: string): string {
  if (!date) return "N/A";

  const parts = date.includes("/") ? date.split("/") : date.split("-");
  const month = parts[1];
  const year = parts[0].length === 4 ? parts[0] : parts[2];
  if (parts.length === 2) return parts.join("/");
  return `${month}/${year}`;
}

export function formatLastEditTime(isoString: string): string {
  const givenDate = new Date(isoString);
  const currentDate = new Date();

  const yearDiff = currentDate.getFullYear() - givenDate.getFullYear();
  const monthDiff = currentDate.getMonth() - givenDate.getMonth();
  const totalMonths = yearDiff * 12 + monthDiff;

  if (totalMonths <= 0) {
    return "edited just now";
  } else if (totalMonths === 1) {
    return "edited 1 month ago";
  } else {
    return `edited ${totalMonths} months ago`;
  }
}
