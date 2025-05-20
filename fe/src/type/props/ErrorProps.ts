export type CustomError = {
  response?: {
    data?: Message | Message[];
  };
  status?: number;
};

type Message = {
  message: string;
};

export type DataError = {
  details: Message[];
  error: string;
};
