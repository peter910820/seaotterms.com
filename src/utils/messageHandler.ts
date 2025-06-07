import { errorSet } from "@/utils/error";

import type { MessageData } from "@/types/commonTypes";

export const messageStorage = (code?: number, msg?: string, errCode?: string) => {
  // 目前邏輯是，如果有不是API交互產生的錯誤，就會攜帶errCode
  let msgObj: MessageData;
  if (errCode === undefined) {
    if (msg !== undefined && code !== undefined) {
      msgObj = {
        statusCode: code,
        content: msg,
        errCode: "",
      };
    } else {
      msgObj = {
        statusCode: 999, // 發生其他的錯誤(送API的同時發生的錯誤，通常是網路或更底層的錯誤)
        content: "發生未知錯誤，請聯繫管理員",
        errCode: "",
      };
    }
  } else {
    // error has occurred
    msgObj = {
      statusCode: 998,
      content: msg ?? "",
      errCode: errorSet.has(errCode) ? errCode : "EX_00",
    };
  }

  sessionStorage.setItem("msg", JSON.stringify(msgObj));
};

export const messageGet = (): MessageData | undefined => {
  const msg = sessionStorage.getItem("msg");
  if (msg) {
    try {
      const parsed = JSON.parse(msg);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        typeof parsed.statusCode === "number" &&
        typeof parsed.content === "string" &&
        typeof parsed.errCode === "string"
      ) {
        return parsed as MessageData;
      }
      return undefined;
    } catch {
      return undefined;
    }
  } else {
    return undefined;
  }
};
