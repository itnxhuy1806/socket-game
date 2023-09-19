export type Question = { id: string; title: string };
export type RoomData = Record<
  string,
  {
    question?: { id: string; title: string };
    users: {
      name: string;
      isHost: boolean;
      online: boolean;
      answer?: Record<string, string>;
    }[];
  }
>;
