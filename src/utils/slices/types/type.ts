export type TFormfields = {
  id: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
};

export type TinitialState = {
  contactList: TFormfields[];
};

export type TAppState = {
  value: TinitialState;
};
