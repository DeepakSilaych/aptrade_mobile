import { create } from "zustand";

interface TableState {
  websocketStatus: string;
  creatorUsername: string;
  tableStatus: boolean;
  gameEnd: boolean;
  users: IUser[];
  active_players: string[],
  recentUserAction: IRecentUserAction;
  timestamp: number;
  seatCount: number;
  winningUsers: IWinningUsers[];
  game: IGame;
  setTableState: (state: ITableState) => void;
  setWebsocketStatus: (status: string) => void;
  resetTableState: () => void;
}

const defaultGame: IGame = {
    variant: "",
    board_cards: [],
    min_starting_stack: 0,
    max_starting_stack: 0,
    small_blind: null,
    big_blind: null,
    min_bet: 0,
    max_bet: 0,
    pot: null,
    pot_amounts: [],
    check_or_call_amount: null,
    ante_trimming_status: null,
    antes: null,
    blinds_or_straddles: null,
    stacks: [],
    street_index: 0,
    round_change: false,
    timestamp: null,
    can_fold: false,
}

const useTableState = create<TableState>((set) => ({
  users: [],
  websocketStatus: "disconnected",
  creatorUsername: "",
  tableStatus: false,
  gameEnd: false,
  active_players: [],
  recentUserAction: {username: "",action: [],timestamp: 0,},
  timestamp: 0,
  seatCount: 0,
  winningUsers: [],
  game: defaultGame,
  setWebsocketStatus: (status: string) => {
    set({ websocketStatus: status });
  },
  setTableState: (state: ITableState) => {
    set(() => ({
      users: state.users || [],
      creatorUsername: state.creator_username || "",
      tableStatus: state.table_status ?? false,
      gameEnd: state.game_end ?? false,
      recentUserAction: state.recent_user_action || { username: "",action: [],timestamp: 0,},
      timestamp: state.timestamp ?? 0,
      seatCount: state.seat_count ?? 0,
      winningUsers: state.winning_users || [],
      active_players: state.active_players || [],
      game: state.game || {
        variant: "",
        board_cards: [],
        min_starting_stack: 0,
        max_starting_stack: 0,
        small_blind: null,
        big_blind: null,
        min_bet: 0,
        max_bet: 0,
        pot: null,
        pot_amounts: [],
        check_or_call_amount: null,
        ante_trimming_status: null,
        antes: null,
        blinds_or_straddles: null,
        stacks: [],
        street_index: 0,
        round_change: false,
        timestamp: null,
        can_fold: false,
      },
    }));
  },
  resetTableState: () => {
    set({
      users: [],
      websocketStatus: "disconnected",
      creatorUsername: "",
      tableStatus: false,
      gameEnd: false,
      active_players: [],
      recentUserAction: {username: "",action: [],timestamp: 0,},
      timestamp: 0,
      seatCount: 0,
      winningUsers: [],
      game: defaultGame,
    });
  }
}));

export default useTableState;

