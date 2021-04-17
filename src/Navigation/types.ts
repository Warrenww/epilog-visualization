export interface FIleOrDir {
  name: string;
  files?: FIleOrDir[];
  size?: number;
}

export interface NavigationProps {
  setActiveLog: React.Dispatch<string>;
}
