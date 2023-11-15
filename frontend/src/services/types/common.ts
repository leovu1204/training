export interface PaginationEdge<Item = any> {
  cursor: string;
  item: Item;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface PaginationConnection<Item = any> {
  totalCount: number;
  list: PaginationEdge<Item>[];
  pageInfo: PageInfo;
}

export interface Pagination<Schema> {
  list: Schema;
}

export interface VerificationForm {
  email: string;
  otpCode: string;
  expiredTime?: Date;
  fromPage?: string;
  password?: string;
}

export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmationPassword: string;
  countryCode: string;
  phone: string;
  phoneCode?: string;
  isAgree?: boolean;
  subscribeNewsletter?: boolean;
}

export interface DataItem {
  author: string;
  content: string;
  created_at: string;
  description: string;
  id: string;
  image: string;
  image_name: string;
  link: string;
  title: string;
  updated_at: string;
  user_id: string;
  next?: string;
  previous?: string;
  video: string;
}

export interface UserInfo {
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  phone_number: string;
  role: string;
  updated_at: string;
  username: string;
}

export const columns = [
  { dataId: 'selected', label: '' },
  { dataId: 'index', label: '번호' },
  { dataId: 'title', label: '제목' },
  { dataId: 'author', label: '작성자' },
  { dataId: 'updated_at', label: '작성일' },
];

export type CheckboxState = Record<string, boolean>;
