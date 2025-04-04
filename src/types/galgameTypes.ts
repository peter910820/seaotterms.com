interface GalgameBrandType {
  brand: string;
  completed: number;
  total: number;
  annotation: string;
  dissolution: boolean;
  inputTime: Date;
  inputName: string;
  updateTime: Date | null;
  updateName: string;
}

interface GalgameType {
  name: string;
  brand: string;
  releaseDate: Date;
  allAges: boolean;
  endDate: Date;
  inputTime: Date;
  inputName: string;
  updateTime: Date | null;
  updateName: string;
}

export { GalgameBrandType, GalgameType };
