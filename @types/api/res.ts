import { langs } from "../lang";

export interface iCustomResponse<T = any> {
  codeStatus: string;
  information?: T;
  err?: any;
  code?: any;
  data?: any;
  fileContent?: any;
  message: string;
}

export interface iCookieRes {
  cookieAccept?: boolean | null;
  bitacoraCookieSaved?: boolean;
}

export interface iPaymentRes {
  unit?: string | null;
  value?: string;
}

export interface iRemotePaymentParametersRes {
  results?: {
    id_blocking_behavior: number;
    name_blocking_behavior: string;
    have_validity_default: number;
    validity_default: number;
    validity_value: number;
    validity_unity: number;
    cardHolderDataRequest: number;
    config_client_product_id: number;
    have_msi: number;
    msi: Array<{
      monthsAvailable: number;
      id_msi: number;
      name_msi: string;
      amount_pucharse: number;
    }>;
    msg_msi: string;
    allow_msi: number;
    allowEdition: number;
  };
}

export interface iLoginRes {
  token: {
    access_token: string;
    clientLogo: string | null;
    email: string;
    groupId: string;
    imageProfile: string | null;
    languageCve: langs;
    languageId: string;
    nombre: string;
    perfilRol: string;
    razonSocial: string;
    solucion: string;
    solucionType: number;
    sucursal: string;
    usrId: number;
    clientId: string;
    dayPassFlag: 1 | 2 | 3;
  };
}

export interface iGetPermissionsRes {
  menu: Object;
  userInfo: {
    client: string;
    group: string;
    group_description: string;
    language: number;
    name: string;
    phone_attention: string;
    role: number;
    role_description: string;
    role_mode_id: number;
  };
}

export interface iGetPaymentsConfig {
  configuration: {
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
}

export interface iGetPaymentsLeagueData {
  linkConfiguration: {
    responseCode: string;
    responseMessage: string;
    typeSmartLink: number;
    apiKey: string;
    amount: string;
    amountNumber: string;
    validUntil: string;
    concept: string;
    folioTxn: string;
    logoUrl: any;
    additionalsFields: any;
    nameCardHolder: any;
    phoneCardHolder: any;
    mailCardHolder: any;
    zipCardHolder: string;
    carrierCardHolder: string;
    cardsToken: null;
    showTokenCard: boolean;
    voucherShow: boolean;
    urlResponseRedirect: any;
    encriptCancelData: string;
    urlWaitResponseDomainSecure: string;
    timeOutResponseDomainSecure: number;
    merchantName: string;
    cssName: string;
    siftParams: {
      sessionId: string;
      userId: string;
      beaconKey: string;
    };
    encriptExpireData: string;
    numbersPatterns: number;
    haveAdditionalInfo: number;
    "3DS": Boolean;
  };
}

export interface iCreatePaymentLeagueRes {
  response: {
    folio: string;
    linkToken: string;
    reference: string;
    responseCode: string;
    responseMessage: string;
    url: string;
    linkConfigId: string | null;
  };
}

export interface iGetMonthsWithoutInterestRes {
  response: Array<{
    nameMsi: string;
    idNameMsi: number;
    montoMinimo: number;
    bin: string;
  }>;
}

export interface iGetTransactionDetailRes {
  results: {
    detail: boolean;
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

export interface iSendPaymentLeagueRes {
  response: {
    codeStatus: null;
    message: string;
  };
}

export interface iTransactionsTableRes {
  results: Array<{
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
}

export interface iUserGetRolesRes {
  listRoles: Array<{
    optionDescription: string;
    optionId: number;
  }>;
}

export interface iUserGetHerarchiesRes {
  listHierarchies: Array<{
    optionDescription: string;
    optionId: number;
  }>;
}

export interface iUserGetStatusRes {
  listStatus: Array<{
    optionDescription: string;
    optionId: number;
  }>;
}

export interface iUserGetTableDataRes {
  list: Array<{
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
}

export interface iUserInformationRes {
  list: {
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
}

export interface iStatusLinkTableDataRes {
  listReport: Array<{
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
}

export interface iGetStatusLinkDetailRes {
  linkreport: {
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

export interface iCancelStatusLinkRes {
  response: {
    linkConfigCancelId: number;
    linkConfigId: number;
    description: string;
    reasonCancelId: number;
    userByRegister: string;
    createdAt: string;
  };
}

export interface iReplayLinkRes {
  idOperation: string;
}

export interface iGetUserPaymentDataRes {
  identidadGrafica: {
    bodyTextType: string;
    bodyType: string;
    buttonTextType: string;
    buttonType: string;
    clientId: string;
    footerTextType: string;
    footerType: string;
    frameId: number;
    generalMailId: number;
    logoPath: string;
    statusId: number;
    styleSettingTypeId: number;
    userId: number;
  };
  linkConfiguration: {
    ["3DS"]?: boolean;
    additionalsFields?: string | null;
    amount?: string;
    amountNumber?: number;
    apiKey?: string;
    cardsToken?: string | null;
    carrierCardHolder?: string;
    concept?: string;
    reference?: string;
    cssName?: string;
    encriptCancelData?: string;
    encriptExpireData?: string;
    folioTxn?: string;
    haveAdditionalInfo?: number;
    logoUrl?: string | null;
    mailCardHolder?: string | null;
    merchantName?: string;
    months?: string;
    nameCardHolder?: string | null;
    numbersPatterns?: number;
    phoneCardHolder?: string | null;
    responseCode?: string;
    responseMessage?: string;
    showTokenCard?: boolean;
    siftParams?: {
      sessionId?: string;
      userId?: string;
      beaconKey?: string;
    };
    timeOutResponseDomainSecure?: number;
    typeSmartLink?: number;
    urlResponseRedirect?: string | null;
    urlWaitResponseDomainSecure?: string;
    validUntil?: string;
    voucherShow?: boolean;
    zipCardHolder?: string;
  };
}

export interface DomainSecureData {
  merchantCity: string;
  merchantId: string;
  cardType: string;
  type3Ds: string;
  urlProvider: string;
  cert3D: string;
  reference3D: string;
  dateExpire: string;
  merchantName: string;
  numberCard: string;
  urlForwardPath: string;
  amount: string;
}

export interface CardData {
  cardHolderId: number;
  cardMask: string;
  cardYear: string;
}

export interface Options {
  idOption: number;
  nameOption: string;
}

export interface ExtraFields {
  showLabel: boolean;
  regex: string;
  defaultValue: string;
  name: string;
  length: number;
  require: boolean;
  label: string;
  type: string;
  order: number;
  options: Options[];
  disableFields: string;
}
export interface GroupExtraFields {
  groupId: number;
  showLabel: boolean;
  label: string;
  index: number;
  fields: ExtraFields[];
}

export interface siftParams {
  userId: string;
  sessionId: string;
  beaconKey: string;
}

export interface iGetCheckoutDataRes {
  responseCode: string;
  responseMessage: string;
  respCode: string;
  respMessage: string;
  folioTxn: string;
  amountNumber: number;
  validUntil: string;
  apiKey: string;
  merchantName: string;
  concept: string;
  typeEnv: number;
  showTokenCard: boolean;
  cardsToken: CardData[];
  currency: string;
  nameCardHolder: string;
  phoneCardHolder: string;
  mailCardHolder: string;
  zipCardHolder: string;
  urlWaitResponseDomainSecure: string;
  timeOutResponseDomainSecure: number;
  carrierCardHolder: string;
  cssName: string;
  encriptCancelData: string;
  urlResponseRedirect: string;
  additionalsFields: GroupExtraFields[];
  siftParams: siftParams;
}

export interface iSendStatusDomainSecureRes {
  statusCode: string;
  message: string;
  paymentData: any;
  success: boolean;
}
export interface iSendPaymentRes {
  responseCode: string;
  responseMessage: string;
  respCode: string;
  respMessage: string;
  autCode: string;
  refNumber: string;
  amount: string;
  cardNumber: string;
  cardBrand: string;
  cardType: string;
  cardName: string;
  responseCodeAuthorizer: string;
  apiKey: string;
  nameCardHolder: string;
  tokenCard: string;
  cardEmisor: string;
  showTokenCard: boolean;
  typeEnv: number;
  folioTx: string;
  encripData: string;
  dataReq: string;
  urlResponseRedirect: string;
  params3DS: DomainSecureData;
}

export interface iSetMailServerConfigRes {
  configurationMail: null | any;
}

export interface iGetMailServerInitDataRes {
  configurationMail: {
    mailConfigurationId?: number;
    clientId?: string;
    serverMailId?: number;
    portServer?: string;
    securityMailId?: number;
    passwordMail?: string;
    userMail?: string;
    updateDate?: null | any;
    statusId?: string;
    user_by_register?: number;
    createdAt?: number;
  };
}

export interface iGetTransmitterDataRes {
  results: Array<{
    id: null | any;
    cve: string;
    name: string;
    description: null | any;
  }>;
}

export interface iSetMailPaymentLeagueDataRes {
  results: string;
}

export interface iGetMailPaymentLeagueDataRes {
  results: {
    client_id: string;
    user_id: null | any;
    message_header: string;
    line_one_title: string;
    line_two_title: string;
    message_body: string;
    message_footer: string;
    phone_footer: string;
    mail_footer: string;
    disclaimer_footer: string;
  };
}

export interface iSetTicketProofPaymentRes {
  results: string;
}

export interface iGetTicketProofPaymentRes {
  results: {
    client_id: string;
    user_id: null | any;
    message_header: string;
    line_one_title: string;
    line_two_title: string;
    message_body: string;
  };
}

export interface iDownloadStatusLinkTableDataRes {
  data: string;
  filename: string;
}

export interface iGetCatalogRes {
  information: Array<{
    createdAtOption: number;
    cveOption: string;
    descriptionOption: string;
    idOption: number;
    languageIdOption: string;
    nameOption: string;
    statusIdOption: number;
    userByRegisterOption: string;
  }>;
}

export interface iGetConciliationTableRowRes {
  amountTreasury: number;
  hasManualConciliation: boolean;
  manualConciliation: null | any;
  merchants: Array<{
    merchantNumber: string;
    merchantName: null | any;
  }>;
  numTransactionBank: null | any;
  numTransactionBankSettled: string;
  numTransactionSmart: string;
  numTransactionSmartSettled: string;
  refundAmount: null | any;
  transactionBank: null | any;
  transactionBankSettled: number;
  transactionSmart: number;
  transactionSmartSettled: number;
  transactionsDate: string;
}
export interface iGetConciliationTableInfoRes {
  code: string;
  message: string;
  data: Array<{
    "amount-treasury": {
      "acquire-id": null | number;
      amount: null | number;
      created_at: null | number;
      date_conciliation: null | string;
      status_id: null | number;
      treasury_conciliation: null | number;
      userName: null | string;
      user_by_register: null | number;
    };
    "manual-conciliation": {
      description: null | string;
      createAt: null | any;
      conciliationDate: null | string;
      userRegister: null | any;
      hasManual: null | boolean;
    };
    "summary-transaction-date": string;
    "summary-bank": string;
    "summary-is-concilied": boolean;
    "summary-total-treasury-amount": number;
    "summary-total-bank-amount": null | any;
    "summary-concilied": {
      "smart-notxn": number;
      "bank-notxn": number;
      "smart-amount": number;
      "bank-amount": number;
      "chargeback-amount": number;
      "refund-amount": number;
    };
    "summary-settlement": {
      "smart-notxn": number;
      "bank-notxn": number;
      "smart-amount": number;
      "bank-amount": number;
      "chargeback-amount": number;
      "refund-amount": number;
    };
  }>;
}

export interface iDownloadConciliationFileRes {
  extension: string;
  fileArray: string;
  fileBase64: null | any;
  name: string;
}

export interface iGetDispersionDataContentRes {
  dispersion_date: string;
  dispersion_name: string;
  dispersion_result: string;
  dispersion_status: string;
  dispersion_tracking: string;
  dispersion_user: null | any;
}
export interface iGetDispersionDataRes {
  data: Array<iGetDispersionDataContentRes>;
}

export interface iDownloadDispersionFileRes {
  spai: {
    document: string;
    file_name: string;
  };
  terceros: {
    document: string;
    file_name: string;
  };
}

export interface iGetCategoryOptionsRes {
  "": Array<{
    category_type_id: number;
    name: string;
  }>;
}

export interface iGetNatureOptionsRes {
  "": Array<{
    category_type_id: number;
    name: string;
  }>;
}

export interface iMonetaryAdjustmentDataRes {
  category: {
    id: number;
    name: string;
  };
  "monetary-adjustment-created-by": string;
  "monetary-adjustment-id": number;
  "monetary-adjustment-name": string;
  nature: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
}

export interface iGetFrames {
  frames: Array<{
    framesCatalogId: number;
    framePathLeft: string;
    framePathRight: string | null;
    name: string;
    statusId: number;
  }>;
}

export interface iGetGeneralMailColors {
  general_mail: [
    {
      bodyTextType: string;
      bodyType: string;
      buttonTextType: string;
      buttonType: string;
      clientId: string;
      footerTextType: string;
      footerType: string;
      frameId: number;
      generalMailId: number;
      logoPath: string;
      statusId: number;
      styleSettingTypeId: number;
      userId: number;
    }
  ];
}

export interface iGetSmartLinkColors {
  checkout: [
    {
      bodyTextType: string;
      bodyType: string;
      buttonTextType: string;
      buttonType: string;
      clientId: string;
      footerTextType: string;
      footerType: string;
      frameId: number;
      generalMailId: number;
      logoPath: string;
      statusId: number;
      styleSettingTypeId: number;
      userId: number;
    }
  ];
}

export interface iHasManyRFCs {
  codeStatus: string;
  message: string;
  information: {
    has_many_rfcs?: boolean;
  };
}

export interface iHasManyCLABEs {
  codeStatus: string;
  message: string;
  information: {
    has_many_rfcs?: boolean;
  };
}

export interface NextHierarchy {
  groupId: string;
  groupLevelId: number;
  groupLevelName: string;
  groupName: string;
}
export interface iGetHierarchy {
  codeStatus: string;
  message: string;
  information?: {
    next_hierarchy?: Array<NextHierarchy>;
  };
}

export interface iGetMenu {
  codeStatus: string;
  message: string;
  information: {
    userInfo?: {
      phone_attention: string;
      role: number;
      name: string;
      client: string;
      language: number;
      role_mode_id: number;
      group_description: string;
      role_description: string;
      group: string;
    };
    menu?: {};
  };
}

export interface iGetGroupCatalogRes {
  group: Array<{
    client_id: string;
    created_at: string;
    cve: string;
    group_id: string;
    group_level_id: number;
    name: string;
    parent_group_id: string;
    status_id: number;
    user_by_register: number;
  }>;
}

export interface iGetGroupByCatalogRes {
  group: Array<{
    client_id: string;
    created_at: string;
    cve: string;
    group_id: string;
    group_level_id: number;
    name: string;
    parent_group_id: string;
    status_id: number;
    user_by_register: number;
  }>;
}

export interface iGetBusinessNameRes {
  group: Array<{
    client_id: string;
    created_at: string;
    cve: string;
    group_id: string;
    group_level_id: number;
    name: string;
    parent_group_id: string;
    status_id: number;
    user_by_register: number;
  }>;
}

export interface iGetSubsidiaryCatalogRes {
  group: Array<{
    client_id: string;
    created_at: string;
    cve: string;
    group_id: string;
    group_level_id: number;
    name: string;
    parent_group_id: string;
    status_id: number;
    user_by_register: number;
  }>;
}

export interface iGetReleaseTableDataRes {
  group: Array<{
    amount: number;
    clabe: string;
    clientId: string;
    createdAt: string;
    motivoDevolucion: string;
    name: string;
    paymentReference: string;
    referencePaymentDispersionId: number;
  }>;
}

export interface iModalBlockedRes {
  result: {
    amount: string;
    authorizerReplyMessage: null | any;
    cancelConcept: null | any;
    cardName: null | any;
    cardNumber: null | any;
    cardType: null | any;
    hierarchyId: null | any;
    issuingBank: null | any;
    linkConcept: string;
    linkDate: null | any;
    linkEstatus: number;
    linkHour: null | any;
    linkUser: null | any;
    monthsWithoutInterest: null | any;
    operationTypeId: number;
    paymentDate: null | any;
    paymentHour: null | any;
    paymentStatus: string;
    refSPNum: null | any;
    respCode: null | any;
    returnOperation: null | any;
    tradeReference: string;
  };
}
