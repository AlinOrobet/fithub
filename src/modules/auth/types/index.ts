export type AUTH_TYPE = "sign-in" | "sign-up" | "forgot-password" | "error-state";
export type ERROR_TYPE = "";

export type AUTH_MODALS_CONTENT = {
  type: AUTH_TYPE;
  title: string;
  description: string;
  prompt: string;
  action: string;
  navigateTo: AUTH_TYPE;
};

export type AUTH_ERRORS_CONTENT = {
  type: ERROR_TYPE;
  description: string;
  action: string;
  navigateTo: AUTH_TYPE;
};
