var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import DataGridView from './DataGrid';
// import { escape } from '@microsoft/sp-lodash-subset';
var RestiveSearchApp = /** @class */ (function (_super) {
    __extends(RestiveSearchApp, _super);
    function RestiveSearchApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RestiveSearchApp.prototype.render = function () {
        var context = this.props.context;
        return (React.createElement("section", null,
            React.createElement(DataGridView, { context: context })));
    };
    return RestiveSearchApp;
}(React.Component));
export default RestiveSearchApp;
//# sourceMappingURL=RestiveSearchApp.js.map