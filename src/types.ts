export type School = {
  alpha_two_code: string;
  name: string;
  domains: string[];
  country: string;
  "state-province": string;
  web_pages: string[];
};

export interface AutocompleteProps {
  dataList: School[];
  isFetching: boolean;
  setQueryValue: (value: string) => void;
  setIsFetching: (value: boolean) => void;
  isError?: string;
}

export interface HighlighterProps {
  inputValue: string;
  schoolName: string;
}
