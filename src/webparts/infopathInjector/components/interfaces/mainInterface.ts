export interface IMainFilterProps {
  filters: Array<string>;
}
 
export interface IMainProps {
  appTitle?: string;
  listTitle?: string;
  externalUrls?: Array<string>;
  externalListTitle1?: string;
  context: any;
}
 
export interface optionProps {
  listTitle?: string;
  externalListTitle1?: string;
  externalListURL?: string;
}

/**
* @todo : Make some properties required during deployment
*/
export interface valueProps {
  Title?: string;
  BernhardtReportDate?: Date;
  BernhardtREPORTTYPE?: string;
  BernhardtCATEGORYREASON?: string;
  BernhardtAccountName?: string;
  BernhardtAccountNumber?: string;
  BernhardtACKNOWLEDGMENTNo?: string;
  BernhardtPONUMBER?: string;
  BernhardtInvoiceNumber1?: string;
  BernhardtInvoiceDate1?: Date;
  BernhardtInvoiceNumber2?: string;
  BernhardtInvoiceDate2?: Date;
  BernhardtRemarks?: string;
  BernhardtResolution?: string;
  Attachment?: string;
  Attachments?: boolean;
  Id?: boolean;
}

export interface filterProps {
  filterArray?: Array<string>;
}

export interface paramReturnedProps {
  applyFilters: string;
  urlToFetch: string;
  listName: string;
}

export interface singleItemReturnedProps {
  withAttachments: boolean;
  responseData: string;
  attachments?: string;
}

export interface Iitem {
  reportDate?: Date;
  reportType?: string;
  reportCategory?: string;
  reportAccountNumber?: string;
  reportAccountName?: string;
  reportAckNum?: string;
  reportPOnum?: string;
  reportInvoiceNum1?: string;
  reportInvoiceNum2?: string;
  reportInvoiceDate1?: Date;
  reportInvoiceDate2?: Date;
  reportRemarks?: string;
  reportResolution?: string;
  reportAttachment?: string;
}

export interface INewEntryProps {
  item?: any;
  formState: string;
  renderSelectedItem?: any;
  formInputState: any;
  handleSubmitOrEdit: any;
  cancelNewEntry: any;
  context: any;
  files: Array<any>;
  getAllDealerInfo: any;
  dealers: Array<any>;
}

export interface IHomeProps {
  renderFilterInput: any;
  searchFilterQuery: string;
  addNewItem: any;
  changeFilterType: any;
  searchFilterType: any;
  context: any;
  items: Array<any>;
  changeMainView: string;
  renderSelectedItem: any;
  formState?: string;
}
 