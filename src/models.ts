export interface Category {
  id: number;
  parent_id?: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  attributes: AttributeValue[];
}

export interface AttributeValue {
  code: string;
  value: unknown;
}

export interface User {
  id: number;
  email: string;
  password: string;
}
