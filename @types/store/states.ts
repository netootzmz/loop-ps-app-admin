import { langs } from "../lang";

export interface iUiState {
  lang: langs;
  cookie: boolean;
  title?: string;
  menu: boolean;
  perm?: any;
}

export interface iAuthState {
  access_token?: string;
  client?: string;
  clientId?: string;
  clientLogo?: string | null;
  dayPassFlag?: 1 | 2 | 3;
  email?: string;
  group?: string;
  groupId?: string;
  group_description?: string;
  imageProfile?: string | null;
  language?: number;
  lang?: langs;
  languageCve?: string;
  languageId?: string;
  name?: string;
  nombre?: string;
  perfilRol?: string;
  phone_attention?: string;
  razonSocial?: string;
  role?: number;
  role_description?: string;
  role_mode_id?: number;
  solucion?: string;
  solucionType?: number;
  sucursal?: string;
  usrId?: number;
}

export interface iPaymentsState {
  config?: {
    apiKey: string;
    validityDefault: number;
    editValidity: number;
    paymentScreenBehaviorId: number;
    numbersPatterns: number | null;
    sendWay: Array<{ idOption: number; nameOption: string }>;
    cardHolderDataRequest: number | null;
    validityValue: number | null;
    validityUnity: number | null;
    allowEdition: number | null;
    allowMsi: number | null;
    haveMsi: number | null;
    msi: Array<{
      msiId: number;
      msiName: string;
      amountPurchase: number;
      amountPucharse: number;
      monthsAvailable: number;
    }>;
  };
  newLinkData?: {
    folio: string;
    linkToken: string;
    reference: string;
    responseCode: string;
    responseMessage: string;
    url: string;
    linkConfigId: string | null;
  };
  checkBlocked?: boolean;
  reportsTable?: Array<{
    linkConfigId: number;
    amount: string;
    hierarchy: string;
    concept: string;
    groupId: string;
    tradeReference: string;
    folio: string;
    createdAtUser: string;
    name: string;
    linkStatus: number;
    createdAtDate: string;
    createdAtHour: string;
    paymentStatus: string;
    typeTransactionId: number;
    transactionCreatedAt: string;
    modality: string;
  }>;
  detailActive?: {
    businessData: {
      businessName: string;
      subsidiary: string;
    };
    paymentData: {
      linkConcept: string;
      refSPNum: string;
      amount: string;
      monthsWithoutInterest: number;
      paymentStatus: string;
      returnOperation: string;
      authorizerReplyMesssage: string;
    };
    cardData: {
      cardNumber: string;
      issuingBank: string;
      cardName: string;
      cardType: string;
    };
    linkPaymentData: {
      linkDate: string;
      linkHour: string;
      linkUser: string;
      paymentDate: string;
      paymentHour: string;
      linkStatus: number;
    };
  };
}

interface iDetailsResponse {
  amount: number;
  amountStr: string;
  amountTip: number;
  approvalCode: string;
  authorizerReplyMessage: string;
  cardNumber: any;
  emisorId: any;
  folioTxn: string;
  hierarchyId: string;
  hierarchyName: string;
  merchantNumber: string;
  monthsWithoutInterest: any;
  operationType: string;
  operationTypeId: number;
  paymentDate: string;
  paymentHour: string;
  paymentStatus: string;
  productDescription: string;
  productId: any;
  refSgNumber: string;
  refSpNumber: string;
  referenceNumber: string;
  returnOperation: string;
  transactionDate: string;
  transactionHour: string;
  transactionsConciliation: string;
  transmitter: string;
}

export interface iDetailsState {
  results: Array<iDetailsResponse> | null;
}

export interface iTransactionsState {
  reportsTable?: Array<{
    amount: number;
    amountStr: string;
    amountTip: number;
    approvalCode: string;
    authorizerReplyMessage: string;
    cardNumber: any;
    emisorId: any;
    folioTxn: string;
    hierarchyId: string;
    hierarchyName: string;
    merchantNumber: string;
    monthsWithoutInterest: any;
    operationType: string;
    operationTypeId: number;
    paymentDate: any;
    paymentHour: any;
    paymentStatus: string;
    productDescription: string;
    productId: any;
    refSgNumber: string;
    refSpNumber: string;
    referenceNumber: string;
    returnOperation: string;
    transactionDate: string;
    transactionHour: any;
    transactionsConciliation: any;
    transmitter: string;
    cardBrand: string;
  }>;
  transactionActive?: {
    clientServPtalDto: {
      email: string;
      phone: number;
      clientName: string;
      address: string;
      amount: string;
    };
    promissoryNoteServPtalDto: {
      urlLogo: string;
      merchantName: string;
      optionalMessage: string;
      address: string;
      saleAmount: string;
      tippingAmount: string;
      totalAmount: string;
      statusPromissoryNote: string;
      authorizationNumber: string;
      merchantNumber: string;
      transactionType: string;
      payDate: string;
      referenceNumber: string;
      folio: string;
      cardNumber: string;
      cardIssuer: string;
      acquirer: string;
      eci: string;
      cardType: string;
      product: string;
      cardTypeId: number;
      typeCurrency: number;
    };
    informationServPtalDto: {
      transactionResult: string;
      response: string;
      date: string;
      hour: string;
      product: string;
      paymentMethod: string;
      typeSale: string;
      typeOperation: string;
      amountCharged: string;
      orderId: number;
      authorizationCode: string;
      reference: string;
      productSolution: string;
      clientId: string;
    };
    cardServPtalDto: {
      cardType: string;
      clientBank: string;
      cardBrand: string;
      fourDigitCard: string;
    };
    amountAndCommisionsServPtalDto: {
      transactionAmount: string;
      baseRateCommission: string;
      commissionOnRate: string;
      tax: string;
      totalCommission: string;
    };
  };
}

export interface iPreferencesState {
  users?: {
    filters?: {
      hierarchy: Array<{
        optionDescription: string;
        optionId: number;
      }>;
      profile: Array<{
        optionDescription: string;
        optionId: number;
      }>;
      status: Array<{
        optionDescription: string;
        optionId: number;
      }>;
    };
    tableData?: Array<{
      status_id: number;
      name_user: string;
      role: number;
      status_name: string;
      last_login: number;
      hierarchy: string;
      group_description: string;
      group: string;
      role_description: string;
      id: number;
    }>;
    active?: {
      token: string | null;
      user_id: number;
      user_name: string;
      password: string;
      role_id: number | null;
      user_admission: string;
      date_admission: number;
      name: string;
      second_name: string | null;
      last_name1: string;
      last_name2: string | null;
      mail: string;
      phone: string;
      extension: number;
      user_change: string;
      date_change: number;
      status_id: number;
      language_id: number;
      groupId: number | null;
      clientId: number | null;
    };
  };
  mails?: {
    general?: {
      colors: {
        bodyTextType: string;
        bodyType: string;
        buttonTextType: string;
        buttonType: string;
        footerTextType: string;
        footerType: string;
      };
      frames: Array<{
        id: number;
      }>;
      frame: number;
      logo: string;
    };
  };
  smartlink?: {
    colors: {
      bodyTextType: string;
      bodyType: string;
      buttonTextType: string;
      buttonType: string;
      footerTextType: string;
      footerType: string;
    };
    logo?: string;
  };
}

export interface iGlobalState {
  ui: iUiState;
  auth: iAuthState;
  payments: iPaymentsState;
  transactions: iTransactionsState;
  preferences: iPreferencesState;
}
