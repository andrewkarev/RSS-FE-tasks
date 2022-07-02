interface IGetRespParameter {
  endpoint: string;
  options?: {
    sources?: string | null;
    q?: string;
  };
}

export default IGetRespParameter;
