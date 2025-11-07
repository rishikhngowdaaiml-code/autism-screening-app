import type { User, Child, Report } from "../types";

const APP_LANG = "appLang";
const USERS_KEY = "app_users";
const CHILDREN_KEY = (phone = "") => `children_${phone || "anon"}`;
const REPORTS_KEY = (phone = "") => `reports_${phone || "anon"}`;

export const storage = {
  getLang: () => localStorage.getItem(APP_LANG) || "en",
  setLang: (l: string) => localStorage.setItem(APP_LANG, l),
  saveUser: (user: User) => localStorage.setItem("current_user", JSON.stringify(user)),
  currentUser: (): User | null => {
    const raw = localStorage.getItem("current_user");
    return raw ? (JSON.parse(raw) as User) : null;
  },
  saveChildren: (phone: string, children: Child[]) => localStorage.setItem(CHILDREN_KEY(phone), JSON.stringify(children)),
  getChildren: (phone: string) => {
    const raw = localStorage.getItem(CHILDREN_KEY(phone));
    return raw ? (JSON.parse(raw) as Child[]) : [];
  },
  saveReports: (phone: string, reports: Report[]) => localStorage.setItem(REPORTS_KEY(phone), JSON.stringify(reports)),
  getReports: (phone: string) => {
    const raw = localStorage.getItem(REPORTS_KEY(phone));
    return raw ? (JSON.parse(raw) as Report[]) : [];
  }
};
