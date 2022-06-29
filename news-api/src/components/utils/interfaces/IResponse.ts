import IAPIresponse from './IAPIresponse';

interface IResponse {
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
  json(): Promise<IAPIresponse>;
}

export default IResponse;
