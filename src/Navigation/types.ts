export interface FIleOrDir {
  name: string;
  files?: FIleOrDir[];
  size?: number;
}
