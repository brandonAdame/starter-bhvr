export type ApiResponse = {
  message: string;
  success: true;
};

export type Team = {
  abbreviation: string;
  id: string;
  logo: string;
  team_name: string;
};

export type User = {
  id: string;
  email: string;
  phone_number: string;
  verified: boolean;
  name: string;
  avatar: string;
};

export type StandingsData = {
  club: string;
  logo?: string;
  W: number;
  D: number;
  L: number;
  GA: number;
  GD: number;
  GF: number;
  MP: number;
  Pts: number;
};

export type RosterView = {
  id: string;
  user_id: string;
  team_id: string;
  player_number: number;
  player_position: string;
  name: string;
  email: string;
  phone_number: string;
  team_name: string;
};

export type RosterMember = {
  id: string;
  user_id: string;
  team: string;
  player_number: number;
  player_position: string;
  player_photo: string;
  expand?: { user_id: User };
};

export type RosterAPIResponse = {
  items: RosterMember[];
  totalItems: number;
  totalPages: number;
  perPage: number;
  page: number;
};

export type StandingsAPIResponse = {
  items: StandingsData[];
  totalItems: number;
  totalPages: number;
  perPage: number;
  page: number;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
