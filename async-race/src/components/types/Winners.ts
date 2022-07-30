import IWinner from '../interfaces/IWinner';

type Winners = Promise<{ winners: IWinner[], count: number } | null>;

export default Winners;
