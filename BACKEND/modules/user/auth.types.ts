/**
 * Shape of data required to register a user
 * This DOES NOT store data – it only describes it
 */
export type RegisterDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  countryCode?: string;
  dateOfBirth?: string;
  country?: string;
  role: string;

  companyName?: string;
  companyEmail?: string;
  companyAddress?: string;
  taxId?: string;
};

/**
 * Shape of login payload
 */
export type LoginDTO = {
  email: string;
  password: string;
};
