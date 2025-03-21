'use strict';

import * as React from 'react';
import { Web } from '@pnp/sp/presets/all';
import Select from "react-select";
import './custom.css';

const DataGridView = (props: any) => {

  const { context } = props;
  const [siteIdLabel, setsiteIdLabel] = React.useState([]);
  const [filteredDocs, setfilteredDocs] = React.useState([]);
  const [filteredbackupDocs, setfilteredbackupDocs] = React.useState([]);
  const [docDetails, setdocDetails] = React.useState([]);
  const [showDropdown, setshowDropdown] = React.useState(false);
  const [backup, setbackup] = React.useState([]);
  const [selectedSiteId, setselectedSiteId] = React.useState();
  const [selectedSiteIdText, setselectedSiteIdText] = React.useState('');
  const [selectedLink, setselectedLink] = React.useState('Find documents');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  // get all the items from a list -- required for sharepoint data results limit (5000)
  const getAllItems = async () => {
    try {
      let returnedItems: any = [];
      const web = Web(context.pageContext.site.absoluteUrl);
      const getData = await web.lists.getByTitle("Store Specific Documents").items.select('Report_x0020_Type,Site_x0020_Id,FileRef,FileLeafRef,ID,ContentTypeId').orderBy('Site_x0020_Id', true).top(5000).getPaged().then((page: { results: any; }) => {
        if (page) {
          // data was returned, so concat the results
          returnedItems = returnedItems.concat(page.results);
          return page;
        } else {
          return returnedItems;
        }
      });

      if (getData.nextUrl) {
        return returnedItems.concat(await pageData(getData).then((result: any) => {
          return result;
        }));
      } else {
        return returnedItems;
      }
    } catch (e) {
      return {
        body: e.data.responseBody ? e.data.responseBody['odata.error'].message.value : e,
        status: e.status,
        statusText: e.statusText
      }
    }
  }

  const pageData: any = async (data: any) => {
    try {
      let returnedItems: any = [];
      const getPage = await data.getNext().then((page: { results: any; }) => {
        if (page) {
          // data was returned so concat the results
          returnedItems = returnedItems.concat(page.results);
          return page;
        } else {
          return;
        }
      });

      if (getPage.nextUrl) {
        // still have more pages, so go get more
        return returnedItems.concat(await pageData(getPage));
      } else {
        // we've reached the last page
        return returnedItems;
      }
    } catch (e) {
      return {
        body: e.data.responseBody ? e.data.responseBody['odata.error'].message.value : e,
        status: e.status,
        statusText: e.statusText
      }
    }
  }

  const fetchFav = async () => {
    setIsLoading(true);
    try{
      const docData = await getAllItems();
      const uniqueData: string | any[] = [];
      const uniqueDpData: string | any[] = [];
      // keep only unique values (removes duplicates)
      docData.forEach((element: any) => {
        if (uniqueData.indexOf(element.Site_x0020_Id) === -1) {
          if (element.Site_x0020_Id != null){
            uniqueData.push(element.Site_x0020_Id);
            uniqueDpData.push({
              value: element.Site_x0020_Id,
              label: element.Site_x0020_Id
            });
          }
        }
      });
      setsiteIdLabel(uniqueDpData);
      setdocDetails(docData);
    } catch(e){
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const changeSiteID = (sd: any) => {
    setshowDropdown(false);
    setselectedLink('Find documents');
    const filteredDocs1: React.SetStateAction<any[]> = [];
    let groupBox: any = [];
    setbackup(docDetails);
    docDetails.forEach((element: any) => {
      let groupLabel: any = [];
      if (element.Site_x0020_Id === sd.value && groupBox.indexOf(element.Report_x0020_Type) === -1) {
        groupBox.push(element.Report_x0020_Type);
        docDetails.forEach((innrelement: any) => {
          if (innrelement.Report_x0020_Type === element.Report_x0020_Type && innrelement.Site_x0020_Id === sd.value) {
            groupLabel.push({
              value: element.ID,
              label: element.FileLeafRef
            });
          }
        });
        filteredDocs1.push({
          label: element.Report_x0020_Type,
          options: groupLabel
        })
      }
    });
    setIsDisabled(false);
    setfilteredDocs(filteredDocs1);
    setfilteredbackupDocs(filteredDocs1);
    setselectedSiteId(sd);
    setselectedSiteIdText(sd.value);
  }

  const changeLink = (link: any) => {
    docDetails.forEach((value) => {
      if (value.ID === link.value) {
        setselectedLink(value.FileLeafRef);
        setshowDropdown(false);
        setfilteredDocs(filteredbackupDocs);
        window.open(value.FileRef, '_blank');
      }
    })
  }

  const searchContent = (e: any) => {
    const filteredDocs2: React.SetStateAction<any[]> = [];
    let groupBox: any = [];
    if (e.currentTarget.value !== "") {
      backup.forEach((element: any) => {
        let groupLabel: any = [];
        if (element.Site_x0020_Id === selectedSiteIdText && groupBox.indexOf(element.Report_x0020_Type) === -1 && (element.FileLeafRef.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1 || element.Report_x0020_Type.toLowerCase().includes(e.currentTarget.value.toLowerCase()))) {
          groupBox.push(element.Report_x0020_Type);
          backup.forEach((innrelement: any) => {
            if (innrelement.Report_x0020_Type === element.Report_x0020_Type && innrelement.Site_x0020_Id === selectedSiteIdText) {
              groupLabel.push({
                value: element.ID,
                label: element.FileLeafRef
              });
            }
          });
          filteredDocs2.push({
            label: element.Report_x0020_Type,
            options: groupLabel
          })
        }
      });
      setfilteredDocs(filteredDocs2);
    }
    else {
      setfilteredDocs(filteredbackupDocs);
    }
  }
  
  const keyboardNavigation = (e:any) => {
    if(e.keyCode === 13){
      e.preventDefault();
      showDropdown ? setshowDropdown(false) : setshowDropdown(true);
    }
  }

  React.useEffect(() => {
    fetchFav();
  }, [context]);

  return (
    <div className="coverEntireBox">
      <div className="headingdiv">
        Search Site Documents
      </div>
      <div className="coversiteDocuments">
        <div className={"docsdiv1 " + (isLoading && "loading")}>
          <Select
            placeholder={isLoading ? "Loading" : "Enter site id" }
            options={siteIdLabel}
            value={selectedSiteId}
            onChange={changeSiteID}
            styles={{
              control: (baseStyles: any, state: any) => ({
                ...baseStyles,
                cursor: 'pointer',
                borderRadius: 0,
                border: 0,
                padding: '8px 5px'
              })
            }}
          />
        </div>
        <div className='docsdiv2'>
          <div 
            className={'dropdownParent ' + (isDisabled && 'disabled')} 
            tabIndex={0} 
            role='button' 
            onKeyDown={(e) => keyboardNavigation(e)}
            onClick={() => { setshowDropdown(!showDropdown) }}>
            {selectedLink}
            <div className="dropdownarrowparent">
              <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                <path xmlns="http://www.w3.org/2000/svg" d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#cccccc" />
              </svg>
            </div>
          </div>
          {showDropdown &&
            <div className="dropdownCover">
              <div className="dropdownSearch">
                <input type="text" name="" id="" onKeyUp={(e) => searchContent(e)} className="dropdownInput" />
                <div className="searchicon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 488.4 488.4">
                    <g>
                      <g>
                        <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="dropdownContentCover">
                {(filteredDocs && filteredDocs.length > 0) ? filteredDocs.map((value: any) => {
                  return (
                    <>
                      <div className="dropdownContentHeading">
                        {value.label}
                      </div>
                      {value.options.map((innerval: any) => {
                        return (
                          <button className="dropdownContentBody" onClick={() => changeLink(innerval)}>
                            {innerval.label}
                          </button>
                        )
                      })}
                    </>
                  )
                }) : (
                  <div className="dropdownContentBody">
                    Documents not found
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default DataGridView;