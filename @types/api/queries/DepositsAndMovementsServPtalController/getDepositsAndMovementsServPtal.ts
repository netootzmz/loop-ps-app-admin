export interface IFilters {
  startDate: string;
  endDate: string;
  paymentReference: string;
  rfc: string;
  clabe: string;
  groupId: string;
  grouperId: string;
  reasonSocialId: string;
  branchId: string;
  updateTable?: boolean;
}

export interface Chronology {
  id: string;
  calendarType: string;
}

export interface CreatedAt {
  month: string;
  year: number;
  dayOfMonth: number;
  hour: number;
  minute: number;
  monthValue: number;
  nano: number;
  second: number;
  dayOfWeek: string;
  dayOfYear: number;
  chronology: Chronology;
}

export interface Result {
  referencePaymentDispersionId: number;
  dispersionTrackingId: number;
  dispersionStatusId: number;
  dispersionStatusCve: string;
  paymentReference: string;
  description: string;
  commerce: string;
  clabe: string;
  amount: number;
  dispersion_date: string;
  payment_code: string;
  payment_detail: string;
  statusId: number;
  userByRegister: string;
  createdAt: CreatedAt;
}

export interface Information {
  results: Result[];
}

export interface IDepositsAndMovementsServPtalRes {
  codeStatus: string;
  message: string;
  information: Information;
}
