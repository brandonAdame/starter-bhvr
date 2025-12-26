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

export type RosterMember = {
  phone_number: string;
  player_email: string;
  player_name: string;
  player_position: string;
  player_number: number;
  player_photo: string;
  team: string; // team ID
  expand?: Team;
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
