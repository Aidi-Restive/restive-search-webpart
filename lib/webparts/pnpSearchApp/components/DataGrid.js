'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { Web } from '@pnp/sp/presets/all';
import Select from "react-select";
import './custom.css';
var DataGridView = function (props) {
    var context = props.context;
    var _a = React.useState([]), siteIdLabel = _a[0], setsiteIdLabel = _a[1];
    var _b = React.useState([]), filteredDocs = _b[0], setfilteredDocs = _b[1];
    var _c = React.useState([]), filteredbackupDocs = _c[0], setfilteredbackupDocs = _c[1];
    var _d = React.useState([]), docDetails = _d[0], setdocDetails = _d[1];
    var _e = React.useState(false), showDropdown = _e[0], setshowDropdown = _e[1];
    var _f = React.useState([]), backup = _f[0], setbackup = _f[1];
    var _g = React.useState(), selectedSiteId = _g[0], setselectedSiteId = _g[1];
    var _h = React.useState(''), selectedSiteIdText = _h[0], setselectedSiteIdText = _h[1];
    var _j = React.useState('Find documents'), selectedLink = _j[0], setselectedLink = _j[1];
    var _k = React.useState(true), isDisabled = _k[0], setIsDisabled = _k[1];
    var _l = React.useState(false), isLoading = _l[0], setIsLoading = _l[1];
    // get all the items from a list -- required for sharepoint data results limit (5000)
    var getAllItems = function () { return __awaiter(void 0, void 0, void 0, function () {
        var returnedItems_1, web, getData, _a, _b, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    returnedItems_1 = [];
                    web = Web(context.pageContext.site.absoluteUrl);
                    return [4 /*yield*/, web.lists.getByTitle("Store Specific Documents").items.select('Report_x0020_Type,Site_x0020_Id,FileRef,FileLeafRef,ID,ContentTypeId').orderBy('Site_x0020_Id', true).top(5000).getPaged().then(function (page) {
                            if (page) {
                                // data was returned, so concat the results
                                returnedItems_1 = returnedItems_1.concat(page.results);
                                return page;
                            }
                            else {
                                return returnedItems_1;
                            }
                        })];
                case 1:
                    getData = _c.sent();
                    if (!getData.nextUrl) return [3 /*break*/, 3];
                    _b = (_a = returnedItems_1).concat;
                    return [4 /*yield*/, pageData(getData).then(function (result) {
                            return result;
                        })];
                case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                case 3: return [2 /*return*/, returnedItems_1];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_1 = _c.sent();
                    return [2 /*return*/, {
                            body: e_1.data.responseBody ? e_1.data.responseBody['odata.error'].message.value : e_1,
                            status: e_1.status,
                            statusText: e_1.statusText
                        }];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var pageData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var returnedItems_2, getPage, _a, _b, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    returnedItems_2 = [];
                    return [4 /*yield*/, data.getNext().then(function (page) {
                            if (page) {
                                // data was returned so concat the results
                                returnedItems_2 = returnedItems_2.concat(page.results);
                                return page;
                            }
                            else {
                                return;
                            }
                        })];
                case 1:
                    getPage = _c.sent();
                    if (!getPage.nextUrl) return [3 /*break*/, 3];
                    _b = (_a = returnedItems_2).concat;
                    return [4 /*yield*/, pageData(getPage)];
                case 2: 
                // still have more pages, so go get more
                return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                case 3: 
                // we've reached the last page
                return [2 /*return*/, returnedItems_2];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_2 = _c.sent();
                    return [2 /*return*/, {
                            body: e_2.data.responseBody ? e_2.data.responseBody['odata.error'].message.value : e_2,
                            status: e_2.status,
                            statusText: e_2.statusText
                        }];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var fetchFav = function () { return __awaiter(void 0, void 0, void 0, function () {
        var docData, uniqueData_1, uniqueDpData_1, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, getAllItems()];
                case 2:
                    docData = _a.sent();
                    uniqueData_1 = [];
                    uniqueDpData_1 = [];
                    // keep only unique values (removes duplicates)
                    docData.forEach(function (element) {
                        if (uniqueData_1.indexOf(element.Site_x0020_Id) === -1) {
                            if (element.Site_x0020_Id != null) {
                                uniqueData_1.push(element.Site_x0020_Id);
                                uniqueDpData_1.push({
                                    value: element.Site_x0020_Id,
                                    label: element.Site_x0020_Id
                                });
                            }
                        }
                    });
                    setsiteIdLabel(uniqueDpData_1);
                    setdocDetails(docData);
                    return [3 /*break*/, 5];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var changeSiteID = function (sd) {
        setshowDropdown(false);
        setselectedLink('Find documents');
        var filteredDocs1 = [];
        var groupBox = [];
        setbackup(docDetails);
        docDetails.forEach(function (element) {
            var groupLabel = [];
            if (element.Site_x0020_Id === sd.value && groupBox.indexOf(element.Report_x0020_Type) === -1) {
                groupBox.push(element.Report_x0020_Type);
                docDetails.forEach(function (innrelement) {
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
                });
            }
        });
        setIsDisabled(false);
        setfilteredDocs(filteredDocs1);
        setfilteredbackupDocs(filteredDocs1);
        setselectedSiteId(sd);
        setselectedSiteIdText(sd.value);
    };
    var changeLink = function (link) {
        docDetails.forEach(function (value) {
            if (value.ID === link.value) {
                setselectedLink(value.FileLeafRef);
                setshowDropdown(false);
                setfilteredDocs(filteredbackupDocs);
                window.open(value.FileRef, '_blank');
            }
        });
    };
    var searchContent = function (e) {
        var filteredDocs2 = [];
        var groupBox = [];
        if (e.currentTarget.value !== "") {
            backup.forEach(function (element) {
                var groupLabel = [];
                if (element.Site_x0020_Id === selectedSiteIdText && groupBox.indexOf(element.Report_x0020_Type) === -1 && (element.FileLeafRef.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1 || element.Report_x0020_Type.toLowerCase().includes(e.currentTarget.value.toLowerCase()))) {
                    groupBox.push(element.Report_x0020_Type);
                    backup.forEach(function (innrelement) {
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
                    });
                }
            });
            setfilteredDocs(filteredDocs2);
        }
        else {
            setfilteredDocs(filteredbackupDocs);
        }
    };
    React.useEffect(function () {
        fetchFav();
    }, [context]);
    return (React.createElement("div", { className: "coverEntireBox" },
        React.createElement("div", { className: "headingdiv" }, "Search Site Documents"),
        React.createElement("div", { className: "coversiteDocuments" },
            React.createElement("div", { className: "docsdiv1 " + (isLoading && "loading") },
                React.createElement(Select, { placeholder: isLoading ? "Loading" : "Enter site id", options: siteIdLabel, value: selectedSiteId, onChange: changeSiteID, styles: {
                        control: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { cursor: 'pointer', borderRadius: 0, border: 0, padding: '8px 5px' })); }
                    } })),
            React.createElement("div", { className: 'docsdiv2' },
                React.createElement("div", { className: 'dropdownParent ' + (isDisabled && 'disabled'), onClick: function () { setshowDropdown(!showDropdown); } },
                    selectedLink,
                    React.createElement("div", { className: "dropdownarrowparent" },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "800px", height: "800px", viewBox: "0 0 24 24", fill: "none" },
                            React.createElement("path", { xmlns: "http://www.w3.org/2000/svg", d: "M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z", fill: "#cccccc" })))),
                showDropdown &&
                    React.createElement("div", { className: "dropdownCover" },
                        React.createElement("div", { className: "dropdownSearch" },
                            React.createElement("input", { type: "text", name: "", id: "", onKeyUp: function (e) { return searchContent(e); }, className: "dropdownInput" }),
                            React.createElement("div", { className: "searchicon" },
                                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "#000000", height: "800px", width: "800px", version: "1.1", id: "Capa_1", viewBox: "0 0 488.4 488.4" },
                                    React.createElement("g", null,
                                        React.createElement("g", null,
                                            React.createElement("path", { d: "M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z" })))))),
                        React.createElement("div", { className: "dropdownContentCover" }, (filteredDocs && filteredDocs.length > 0) ? filteredDocs.map(function (value) {
                            return (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "dropdownContentHeading" }, value.label),
                                value.options.map(function (innerval) {
                                    return (React.createElement("button", { className: "dropdownContentBody", onClick: function () { return changeLink(innerval); } }, innerval.label));
                                })));
                        }) : (React.createElement("div", { className: "dropdownContentBody" }, "Documents not found"))))))));
};
export default DataGridView;
//# sourceMappingURL=DataGrid.js.map