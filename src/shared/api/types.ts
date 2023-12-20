export type StatusType = {
  Status: "SUCCEDED" | "FAILED";
};

export type LoginResponseType = UserInfoType & StatusType;

export type NewsType = {
  ImageSrc: string;
  Title: string;
  Text: string;
};

export type NewResponseType = {
  News: NewsType[]; // массив объектов типа NewsType
};

export type ViolationType = {
  IdViolation: number;
  Article: string;
  Paragraph: string;
};

export type InfoType = {
  CarNumber: string;
  Violations: ViolationType[];
};

export type UserInfoType = {
  Id: number; // id пользователя в бд-шке
  UserType: "DRIVER" | "OWNER"; // тип пользователя (водитель / владелец)
  Surname: string; // Фамилия
  Firstname: string; // Имя
  Middlename: string; // Отчество
  ViolationsInfo: InfoType[]; // Массив объектов типа InfoType(29 строка),
  // CarNumber - номер машины,
  // Violations - Массив нарушений на этот номер машины,
  // массив нарушений точно такой же, как у нас уже есть, IdViolation, Article, Paragraph
};

export type AddNewCarNumberRequestType = {
  id: number;
  CarNumber: string;
};
