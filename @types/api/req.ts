import { NextApiRequest } from "next";

export interface iCustomReq<T> extends NextApiRequest {
  body: T;
}

export interface iLoginReq {
  email: string;
  password: string;
}

export interface iCookieReq {
  cookieAccept?: boolean;
  ip?: string;
}

export interface iRecoverPasswordReq {
  codeVerification: string;
  newPassword: string;
  newPasswordConfirm: string;
  userName: string;
}

export interface iNewPasswordReq {
  newPassword: string;
  newPasswordConfirm: string;
  password: string;
  email: string;
}

export interface iCreatePaymentLeagueReq {
  amount: number;
  apiKey: string;
  durationTimeLink: number;
  reference: string;
  tradeReference: string;
  typeSmartlink: number;
  validUntil: string;
  months: Array<{
    name: string;
    value: boolean;
    amount: number;
  }>;
}

export interface iSendPaymentLeagueReq {
  addressee: string;
  folioTxn: string;
  typeTemplate: 1;
}

export interface iRemotePaymentParametersReq {
  cardHolderDataRequest: number;
  config_client_product_id: number;
  have_msi: number;
  have_validity_default: number;
  id_blocking_behavior: number;
  msg_msi: string;
  msi: {
    monthsAvailable: number;
    id_msi: number;
    name_msi: string;
    amount_pucharse: number;
  }[];
  name_blocking_behavior: string;
  typeSmartlink: number;
  validity_default: number;
  validity_unity: number;
  validity_value: number;
  allow_msi: number;
  allowEdition: number;
}

export interface iDeployDetailTransactionReq {
  approval?: number;
  cardBrand?: string;
  cardNumberEnd?: string;
  cardType?: number;
  codeMsi?: number;
  eci?: any;
  endDate?: string;
  endHour?: any;
  hierarchyLevelId?: number;
  initDate?: string;
  initHour?: any;
  inputMode?: any;
  operationTypeId?: number;
  paymentReference?: string;
  productId?: number;
  responseCode?: string;
  saleAmount?: number;
  transactionStartDate?: string;
  transactionEndDate?: string;
  transmitter?: string;
}

export interface iTransactionsTableReq {
  approval?: string;
  cardBrand?: string;
  cardNumberEnd?: string;
  cardType?: number;
  codeMsi?: number;
  eci?: any;
  endDate?: string;
  endHour?: any;
  hierarchyLevelId?: number;
  initDate?: string;
  initHour?: any;
  posEntryModeId?: any;
  operationTypeId?: number;
  paymentReference?: string;
  productId?: number;
  responseCode?: string;
  saleAmount?: number;
  transactionStartDate?: string;
  transactionEndDate?: string;
  transmitter?: string;
  merchant?: string;
}

export interface iDownloadDetailTransactionReq {
  approval?: number;
  cardBrand?: string;
  cardNumberEnd?: string;
  cardType?: number;
  codeMsi?: number;
  eci?: any;
  endDate?: string;
  endHour?: any;
  hierarchyLevelId?: number;
  initDate?: string;
  initHour?: any;
  inputMode?: any;
  operationTypeId?: number;
  paymentReference?: string;
  productId?: number;
  responseCode?: string;
  saleAmount?: number;
  transactionStartDate?: string;
  transactionEndDate?: string;
  transmitter?: string;
}

export interface iGetMonthsWithoutInterestReq {
  bin: string;
  folioTxn: string;
}

export interface iGetTransactionDetailReq {
  folioTxn: string;
}

export interface iGetUserTableDataReq {
  hierarchyId?: number;
  profileId?: number;
  statusId?: number;
  stringToSearch?: string;
}

export interface iUserSaveUpdateReq {
  extension: number;
  clientId: string;
  date_admission: string;
  date_change: string;
  groupId: string;
  language_id: number;
  last_name1: string;
  last_name2: string;
  mail: string;
  name: string;
  phone: string;
  roleId: string;
  second_name: string;
  status_id: number;
  user_name: string;
  password: string;
  user_id?: number;
}

export interface iGetStatusLinkTableDataReq {
  createdAt?: string;
  createdAt2?: string;
  linkStatus?: number;
  paymentStatus?: number;
}

export interface iGetStatusLinkDetailReq {
  folioTx: string;
}

export interface iDownloadStatusLinkTableDataReq {
  createdAt?: string;
  createdAt2?: string;
  linkStatus?: number;
  paymentStatus?: number;
}

export interface iCancelStatusLinkReq {
  description: string;
  folio: string;
  reasonCancelId: number;
}

export interface iReplayLinkReq {
  addressee: string;
  folioTxn: string;
  typeTemplate: number;
}

export interface iGetUserPaymentDataReq {
  linkToken: string;
}

export interface iGetCheckoutDataReq {
  token: string;
}

export interface iSendStatusDomainSecureReq {
  folioTxn: string;
}
export interface iSendPaymentReq {
  fechaOperacion: string;
  dataReq: string;
  apiKey: string;
}

export interface iDownloadTransactionReq {
  endDate: string;
  hierarchyLevelId: number;
  initDate: string;
  cardBrand?: string;
  cardNumberEnd?: string;
  cardType?: number;
  codeMsi?: number;
  date_range?: string;
  eci?: string;
  posEntryModeId?: number;
  operationTypeId?: number;
  paymentReference?: string;
  productId?: number;
  responseCode?: string;
  saleAmount?: number | null;
  token?: string;
  transactionEndDate?: string;
  transactionStartDate?: string;
  transmitter?: string;
  merchant?: string;
  approval?: string;
}

export interface iSetMailServerConfigReq {
  clientId: string;
  passwordMail: string;
  portServer: string;
  securityMailId: number;
  serverMail: string;
  userMail: string;
  mailConfigurationId?: number;
}

export interface iSetMailPaymentLeagueDataReq {
  client_id: string;
  message_header: string;
  line_one_title: string;
  line_two_title: string;
  message_body: string;
  message_footer: string;
  phone_footer: string;
  mail_footer: string;
  disclaimer_footer: string;
  cve: string;
}

export interface iGetMailPaymentLeagueDataReq {
  client_id: string;
}

export interface iSetTicketProofPaymentReq {
  client_id: string;
  message_header: string;
  line_one_title: string;
  line_two_title: string;
  message_body: string;
  cve: string;
}

export interface iGetTicketProofPaymentReq {
  client_id: string;
}

export interface iGetMailServerInitDataReq {
  clientId: string | null;
}

export interface iCancelTransactionReq {
  folioTxn: string;
}

export interface iGetCatalogReq {
  languageId: number;
  nameCatalog: string;
}

export interface iGetConciliationTableInfoReq {
  "transactions-summary-acquirer-name": Array<string>;
  "transactions-summary-end-date": string;
  "transactions-summary-start-date": string;
  "transactions-summary-status"?: null | any;
  "transactions-summary-type"?: null | any;
}

export interface iDownloadConciliationFileReq {
  acquirer_id: number;
  transaction_date: string;
  typeReport: string;
}

export interface iSetTreasuryAmountReq {
  acquireId: number;
  amount: number;
  dateConciliation: string;
}

export interface iSetManualConciliationReq {
  comment: string;
  total_amount_bank: number;
  total_amount_treasury: number;
  acquirer_id: number;
  status_id: number;
  conciliation_date: string;
}

export interface iGetDispersionDataReq {
  dispersion_star_date: string;
  dispersion_end_date: string;
}

export interface iDownloadDispersionFileReq {
  star_date: string;
  end_date: string;
}

export interface iMonetaryAdjustmentDataReq {
  "monetary-adjustment-id"?: number;
  "monetary-adjustment-name"?: string;
  "monetary-adjustment-category-id"?: number;
  "monetary-adjustment-nature-id"?: number;
  "monetary-adjustment-status"?: number;
}

export interface iMonetaryAdjustmentNewCategoryReq {
  "monetary-adjustment-name": string;
  "monetary-adjustment-category-id": number;
  "monetary-adjustment-nature-id": number;
  "monetary-adjustment-status": number;
}

export interface iMonetaryAdjustmentUpdateReq {
  "monetary-adjustment-id": number;
  "monetary-adjustment-name": string;
  "monetary-adjustment-category-id": number;
  "monetary-adjustment-nature-id": number;
  "monetary-adjustment-status": number;
}
export interface iCancelTransactionReq {
  folioTxn: string;
}

export interface iSetColorsMailsGeneral {
  bodyTextType: string;
  bodyType: string;
  buttonTextType: string;
  buttonType: string;
  footerTextType: string;
  footerType: string;
  clientId: string;
  frameId: number;
  logo?: string;
}

export interface iGetHierarchyReq {
  groupId?: string;
}

export interface iGetGroupByCatalogReq {
  group_id: string;
}

export interface iGetBusinessNameReq {
  group_id: string;
}

export interface iGetSubsidiaryCatalogReq {
  group_id: string;
}

export interface iGetReleaseTableDataReq {
  clabe: string;
  endDate: string;
  groupId: string;
  groupLevel: number;
  rfc: string;
  startDate: string;
}

export interface iModalBlockedReq {
  folioTx: string | undefined;
}
