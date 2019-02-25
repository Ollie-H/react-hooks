export interface OrganisationAddress {
  id: number;
  org: number;
  address_number_or_name: string;
  address_street: string;
  address_city: string;
  address_county: string;
  address_postcode: string;
  description: string;
  telephone_number: number;
}

export interface Organisation {
  id: number;
  name: string;
  address: OrganisationAddress;
  admin_user: number;
  status: number;
}

export interface OrganisationGroup {
  id: number;
  group: number;
  organisation: number;
  description: string;
  status: boolean;
}

export type OrganisationItemSetting = "stage" | "status";

export interface OrganisationItemStatus {
  id?: number;
  organisation: number;
  name: string;
  order: number;
  status: boolean;
}

export interface OrganisationItemStage {
  id: number;
  organisation: number;
  name: string;
  order: number;
  status: boolean;
}

export type Department = {
  id: number;
  organisation: number;
  name: string;
  address: OrganisationAddress;
  status: boolean;
};

export type DepartmentInput = {
  name: string;
  address: number;
  status: boolean;
};
