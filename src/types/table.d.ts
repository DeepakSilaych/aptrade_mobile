interface IWebsocketMessage {
  status: string;
  message: string;
  table_state: ITableState;
}

interface ITableState {
  rpc_id?: number;
  creator_username?: string;
  json_rpc_version?: number;
  table_status: boolean | null;
  game_end: boolean;
  users: IUser[] | null;
  active_players: string[] | null;
  recent_user_action: IRecentUserAction;
  timestamp: null | number;
  game: IGame;
  history: string;
  seat_count?: number;
  winning_users: IWinningUsers[];
}

interface IWinningUsers {
  username: string;
  winnings: number;
  user_hand_cards: string[];
  user_hole_cards: string[];
  user_board_cards: string[];
  user_hand_rank: string;
}

interface IRecentUserAction {
  username: string;
  action: any[];
  timestamp: null | number;
}

interface IGame {
  variant: string;
  board_cards: string[];
  min_starting_stack: number;
  max_starting_stack: number;
  small_blind: null | number;
  big_blind: null | number;
  min_bet: number;
  max_bet: number;
  pot: number | null;
  pot_amounts: number[];
  check_or_call_amount: null | number;
  ante_trimming_status: null;
  antes: null;
  blinds_or_straddles: null;
  stacks: number[];
  street_index: number;
  round_change: boolean;
  timestamp: null;
  can_fold: boolean;
}

interface IUser {
  username: string;
  player_index: number;
  actor_index: number | null;
  active_status: boolean;
  starting_stack: number | null;
  current_stack: null | number;
  bet: null | number;
  isbutton: boolean;
  isutg: boolean;
  action: any[];
  hole_cards: string[] | null;
  board_cards: string[] | null;
  show_or_muck: boolean;
  can_win_now: boolean;
  user_hand_cards: null | string[];
  user_hand_rank: string | null;
  isallin: boolean;
  timestamp: null | number;
  isfold?: boolean;
}

interface IUserAction {
  userName: string;
  amount: null | number;
  action: string;
}
