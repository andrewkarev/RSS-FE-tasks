interface IAppSOptions {
  brand: string[];
  model: string[];
  color: string[];
  storage: number[];
  year: {
    from: number;
    to: number;
  };
  price: {
    maxPrice: number;
    minPrice: number;
  };
  popular: boolean;
}

export default IAppSOptions;
