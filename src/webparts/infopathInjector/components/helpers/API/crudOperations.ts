import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import {
  optionProps,
  valueProps,
  filterProps,
  paramReturnedProps,
  singleItemReturnedProps
} from '../../interfaces/mainInterface';
import { oDataQueryNames } from "@microsoft/microsoft-graph-client";

/**
 *
 * @param context Required : The global context of SPFx passed down from the main webpart
 * @param options Required : An object that contains the List name and (optional):external url to fetch the list from
 * @param filters Optional : An array of strings that contains the built-in filter params of SPFx REST API
 */
      export const getAllItems = (
        context: any,
        options?: optionProps,
        filters?: filterProps
      ): Promise<any> => {
        // Process the arguments with our helper function
      //   const stringParams = _processArguments(context, options, filters);

        // Deconstructing the object properties so we can write the variables as is
        const { urlToFetch, listName, applyFilters }  = _processArguments(context, options, filters);

        // Will return a JSON promise
        return context.spHttpClient
          .get(
            `${urlToFetch}/_api/web/lists/getbytitle('${listName}')/items?${applyFilters}`,
            SPHttpClient.configurations.v1
          )

          // converts the response into JSON response
          .then(
            response => response.json()
          )

          // Returns the response data
          .then(responseData => {
            // console.dir(responseData)
            // console.log("getAllItems Data: ", responseData.value);
            return responseData;
          }) as Promise<any>;
      };

/** ================================= End of getAllItems ============================================== */



/**
 *
 * @param context Required : The global context of SPFx passed down from the main webpart
 * @param options Required : An object that contains the List name and (optional):external url to fetch the list from
 * @param filters Optional : An array of strings that contains the built-in filter params of SPFx REST API
 */
export const getExternalItems = (
  context: any,
  options?: optionProps,
  filters?: filterProps
): Promise<any> => {
  // Process the arguments with our helper function
//   const stringParams = _processArguments(context, options, filters);

  // Deconstructing the object properties so we can write the variables as is
  const { urlToFetch, listName, applyFilters }  = _processArguments(context, options, filters);

  // Will return a JSON promise
  return context.spHttpClient
    .get(
      `${urlToFetch}/_api/web/lists/getbytitle('${listName}')/items?${applyFilters}`,
      SPHttpClient.configurations.v1
    )

    // converts the response into JSON response
    .then(
      response => response.json()
      // function(response){
      //   return response.json(); // Promise
      // }
    )

    // Returns the response data
    .then(responseData => {
      // console.dir(responseData)
      // console.log("getAllItems Data: ", responseData.value);
      return responseData;
    }) as Promise<any>;
};

/** ================================= End of getExternalItems ============================================== */

/**
 * 
 * @param event
 * @param context
 * @param options
 * @param filters
 */

export const getSingleItem = (
  event: any,
  context: any,
  options: optionProps,
  filters?: filterProps
): Promise<singleItemReturnedProps> => {
  // Process the arguments with our helper function
  // const stringParams =

  // Deconstructing the object properties so we can write the variables as is
  const { urlToFetch, listName, applyFilters } =  _processArguments(context, options, filters);

  // The ID of the entiy to be used in fetching the entity attachment(s)
  const itemID = event.target.id;

  // console.log(event);

  // Will return a JSON promise
  return context.spHttpClient
    .get(
      `${urlToFetch}/_api/web/lists/getbytitle('${listName}')/items(${itemID})`,
      SPHttpClient.configurations.v1
    )

    // converts the response into JSON response
    .then(response => response.json())

    // Returns the response data
    .then(data => {
      let returnedData: singleItemReturnedProps;
      console.log("Get Single Data: ", data);
      if (data.Attachments) {
        returnedData = {
          withAttachments: true,
          responseData: data
        };
      } else {
        returnedData = {
          withAttachments: false,
          responseData: data
        };
      }

      console.log(returnedData);
      return returnedData;
    }) as Promise<singleItemReturnedProps>;
};

/** ==================================== End of getSingleItem =========================================== */


/**
 *
 * @param options
 * @param values
 */

export const addItem = (options: optionProps,
    values?: valueProps
  ): Promise<SPHttpClientResponse> => {
    // console.log({...values})

    return _getItemEntityType({ listTitle: options.listTitle }).then(
      spEntityType => {
        const request: any = {};
        request.body = JSON.stringify({
          ...values,
          "@odata.type": spEntityType
        });

        // console.log(request.body);

        return this.props.context.spHttpClient.post(
          this.props.context.pageContext.web.absoluteUrl +
            `/_api/web/lists/getbytitle('${options.listTitle}')/items`,
          SPHttpClient.configurations.v1,
          request
        );
      }
    );
};


/** =================================== End of addItem ============================================ */

/** */

export const updateItem = (): Promise<string> => {
  return;
};

export const deleteItemToRecycleBin = (itemID: number, listName: string): Promise<string> => {

  return;
};





/**
 * Theses Functions are mainly used as helper function for the CRUD operation
 * It can also be called outside this file
 */



    /**
     * Gets the data entity type before (Adding | Updating | Deleting) a list item
     * @args options = an object that contains external list url and the list title
     * @args @property externalListUrl? = optional external url to be called
     * @args @property listTitle = required list title
     */


        const _getItemEntityType = (options: optionProps): Promise<string> => {
            const urlToFetch: string = options.externalListURL ? options.externalListURL: this.props.context.pageContext.web.absoluteUrl;

            return this.props.context.spHttpClient
            .get(
                `${urlToFetch}/_api/web/lists/getbytitle('${
                options.listTitle
                }')?$select=ListItemEntityTypeFullName`,
                SPHttpClient.configurations.v1
            )
            .then(response => response.json())
            .then(response => {
                // console.log('LOOK HERE: ', response.ListItemEntityTypeFullName )
                return response.ListItemEntityTypeFullName;
            }) as Promise<string>;
        };

    /** =================================== End of _getItemEntityType ====================================== */


    /**
     *
     * @param context REQUIRED<string> : The global context object in an app instance
     * @param urlToFetch
     *    --@property externalListUrl : OPTIONAL<string> of you want to fetch data from a different app/list.
     *      Defaults to the current URL app instance
     * @param listName REQUIRED<string> : The name of the list to fetch data from
     * @param id REQUIRED<number> : The single item ID number
     */
        export const getEntityAttachments = (
            context: any,
            urlToFetch: string,
            listName: string,
            id: number
        ): Promise<any> => {
        return context.spHttpClient
            .get(
            `${urlToFetch}/_api/web/lists/getbytitle('${listName}')/items(${id})?$expand=AttachmentFiles`,
            SPHttpClient.configurations.v1
            )
            .then(response => response.json())
            .then(attachments => {
            // console.log(attachments);
            return attachments;
            }) as Promise<any>;
        };

      /** ================================== End of getEntityAttachments ======================================= */


      /**
       *
       * @param context REQUIRED<string> : The global context object in an app instance
       * @param options
       *    --@property externalListUrl : OPTIONAL<string> of you want to fetch data from a different app/list.
       *      Defaults to the current URL app instance
       * @param filters OPTIONAL<string[]> : Filter params -> see API documentation for proper guidance
       */

          const _processArguments = (context: any, options: optionProps, filters?: filterProps): paramReturnedProps => {
            // Initialize variables
            let defaultFilterString: string = "";
            let userFilterString: string = "";
            let userFilters: Array<string> = [];

            // The default filters
            const defaultFilterArray: Array<string> = [
              "$skiptoken=Paged=True",
              "$top=100"
            ];

            // Loop every filter then concatenate into one long string of filter params
            const defaultFilters: Array<string> = defaultFilterArray.map(filter => {
              return (defaultFilterString += "&" + filter);
            });

            // If a caller its own filters,
            // it will loop through all the filter then concatenate into one long string of filter params
            if (filters) {
              if (filters.filterArray.length > 0) {
                userFilters = filters.filterArray.map(filter => {
                  return (userFilterString += "&" + filter);
                });
              }
            }

            // Validates which filter string to use, if no custom filter is provided,
            // it wil default to defaultStringFilter OR an ERROR message
            const applyFilters = userFilters.length > 0 ? userFilterString : defaultFilters ? defaultFilterString : "ERROR: Check your filters";

            // Validates which URL to fetch data from,
            // it will fetch the current app instance data by default
            const urlToFetch: string = options.externalListURL
              ? options.externalListURL
              : context.pageContext.web.absoluteUrl;

            // The name of the list to fetch
            const listName: string = options.listTitle;

            let paramReturned: paramReturnedProps = {
              applyFilters,
              urlToFetch,
              listName
            };

            return paramReturned;
          };

      /** ================================== End of _processArguments ======================================= */


/** ====================================== End of Helper Functions =================================== */

export const getFiledNames = (context): Promise<any> => {
  return context.spHttpClient.get(
    `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('SecurityAgreement')/fields`,
    SPHttpClient.configurations.v1
    )
    .then(response => response.json())
    .then(data => {
      console.log(data.value);
      return data;
    }) as Promise<any>;
};