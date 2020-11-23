import * as React from 'react';
import styles from './InfopathInjector.module.scss';
import { IInfopathInjectorProps } from './IInfopathInjectorProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


export default class InfopathInjector extends React.Component<IInfopathInjectorProps, {}> {

  public componentDidMount() {
    const uriString = window.location.href;
    const url = new URL(uriString);
    const parentID = url.searchParams.get('ParentID');
    const token = url.searchParams.get('token');
    let mainAppURL: string;


    this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + '/_api/Web/CurrentUser/Groups?$select=Title', SPHttpClient.configurations.v1)
      .then((res: SPHttpClientResponse) => res.json())
      .then(userInfo => {
        const FilteredData = userInfo.value.map( item => item.Title );        
        const isSupplier = FilteredData.indexOf("SP_App_CustomerQuoteSup_Contri") > -1;

        if(isSupplier){
          mainAppURL = this.props.context.pageContext.web.absoluteUrl + '/Lists/Supplier%20Information/For%20Suppliers.aspx';
        } else {
          mainAppURL = this.props.context.pageContext.web.absoluteUrl + '/Lists/Supplier%20Information/SupplierAdminView.aspx';
        }
      
        window.location.href = `https://bernhardtco.sharepoint.com/applications/app_CustomerQuoteRequestV2/_layouts/15/listform.aspx?PageType=8&ListId=%7B1D16F425%2D0919%2D4D9F%2D9501%2D9611CFD6C0D3%7D&ParentID=${parentID}&token=${token}&Source=${mainAppURL}`;
     
      });
  }
  
  public render(): React.ReactElement<IInfopathInjectorProps> {
  

    return (
      <React.Fragment>
        
      </React.Fragment>
    );
  }
}
