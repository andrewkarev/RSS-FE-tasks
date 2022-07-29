import IWinner from '../interfaces/IWinner';

type Winners = Promise<{ winners: IWinner[], count: string | null } | null>;

export default Winners;
