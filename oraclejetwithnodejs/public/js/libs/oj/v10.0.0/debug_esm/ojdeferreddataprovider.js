/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import oj from 'ojs/ojcore-base';
import { DataProviderFeatureChecker } from 'ojs/ojcomponentcore';

/**
 * @license
 * Copyright (c) 2017 2021, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */

/**
 * @preserve Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

/* jslint browser: true,devel:true*/
/**
 *
 * @since 4.2.0
 * @export
 * @final
 * @class DeferredDataProvider
 * @implements DataProvider
 * @ojtsmodule
 * @classdesc This class implements {@link DataProvider}.
 *            This object represents a data provider that is created with deferred data and can be used by any component that requires a data provider that will be created with data from a Promise.
 * @param {Promise.<DataProvider>} dataProvider A promise that resolves to an DataProvider
 * @param {Function} capabilityFunc An function that implements {@link DataProvider#getCapability}.
 * @ojsignature [{target: "Type",
 *               value: "class DeferredDataProvider<K, D> implements DataProvider<K, D>",
 *               genericParameters: [{"name": "K", "description": "Type of Key"}, {"name": "D", "description": "Type of Data"}]},
 *               {target: "Type",
 *               value: "Promise<DataProvider<K, D>>",
 *               for: "dataProvider"},
 *               {target: "Type",
 *               value: "(capabilityName: string)=> any",
 *               for: "capabilityFunc"}]
 * @ojtsimport {module: "ojdataprovider", type: "AMD", imported: ["DataProvider", "SortCriterion", "FetchByKeysParameters",
 *   "ContainsKeysResults","FetchByKeysResults","FetchByOffsetParameters","FetchByOffsetResults",
 *   "FetchListResult","FetchListParameters"]}
 * @example
 * // DeferredDataProvider is used in cases where the data for the data provider will be
 * // provided asynchronously. In the example below, let getDeferredData() be any function
 * // that returns a Promise that will resolve to the final data.
 * var deferredDataPromise = getDeferredData();
 *
 * // Create a Promise that will resolve to a data provider containing the resolved data
 * var dataProviderPromise = deferredDataPromise.then(function(resolvedData){
 *  return new ArrayDataProvider(resolvedData);
 * });
 *
 * // Then create a DeferredDataProvider object with the promise that will resolve to a data provider,
 * // and an implemenation of {@link DataProvider#getCapability}
 * var dataprovider = new DeferredDataProvider(dataProviderPromise, capabilityFunc);
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name containsKeys
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name fetchFirst
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name fetchByKeys
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name fetchByOffset
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name getCapability
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name getTotalSize
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name isEmpty
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name addEventListener
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name removeEventListener
 */

/**
 * @inheritdoc
 * @memberof DeferredDataProvider
 * @instance
 * @method
 * @name dispatchEvent
 */

/**
 * End of jsdoc
 */

class DeferredDataProvider {
    constructor(_dataProvider, _capabilityFunc) {
        this._dataProvider = _dataProvider;
        this._capabilityFunc = _capabilityFunc;
        this._DATAPROVIDER = 'dataProvider';
        this.AsyncIterable = class {
            constructor(_asyncIterator) {
                this._asyncIterator = _asyncIterator;
                this[Symbol.asyncIterator] = function () {
                    return this._asyncIterator;
                };
            }
        };
        this.AsyncIterator = class {
            constructor(_asyncIteratorPromise) {
                this._asyncIteratorPromise = _asyncIteratorPromise;
            }
            ['next']() {
                let self = this;
                return self._asyncIteratorPromise.then(function (asyncIterator) {
                    return asyncIterator['next']();
                });
            }
        };
    }
    fetchFirst(params) {
        let asyncIteratorPromise = this._getDataProvider().then(function (dataProvider) {
            return dataProvider.fetchFirst(params)[Symbol.asyncIterator]();
        });
        return new this.AsyncIterable(new this.AsyncIterator(asyncIteratorPromise));
    }
    fetchByKeys(params) {
        return this._getDataProvider().then(function (dataProvider) {
            return dataProvider.fetchByKeys(params);
        });
    }
    containsKeys(params) {
        return this._getDataProvider().then(function (dataProvider) {
            return dataProvider.containsKeys(params);
        });
    }
    fetchByOffset(params) {
        return this._getDataProvider().then(function (dataProvider) {
            return dataProvider.fetchByOffset(params);
        });
    }
    getTotalSize() {
        return this._getDataProvider().then(function (dataProvider) {
            return dataProvider.getTotalSize();
        });
    }
    isEmpty() {
        if (!this[this._DATAPROVIDER])
            return 'unknown';
        else
            return this[this._DATAPROVIDER].isEmpty();
    }
    getCapability(capabilityName) {
        if (this._capabilityFunc)
            return this._capabilityFunc(capabilityName);
        return null;
    }
    addEventListener(eventType, listener) {
        this._getDataProvider().then(function (dataProvider) {
            dataProvider.addEventListener(eventType, listener);
        });
    }
    removeEventListener(eventType, listener) {
        this._getDataProvider().then(function (dataProvider) {
            dataProvider.removeEventListener(eventType, listener);
        });
    }
    dispatchEvent(evt) {
        if (!this[this._DATAPROVIDER])
            return false;
        return this[this._DATAPROVIDER].dispatchEvent(evt);
    }
    _getDataProvider() {
        let self = this;
        return this._dataProvider.then(function (dataProvider) {
            if (DataProviderFeatureChecker.isDataProvider(dataProvider)) {
                if (!self[self._DATAPROVIDER])
                    self[self._DATAPROVIDER] = dataProvider;
                return dataProvider;
            }
            else
                throw new Error('Invalid data type. DeferredDataProvider takes a Promise<DataProvider>');
        });
    }
}
oj._registerLegacyNamespaceProp('DeferredDataProvider', DeferredDataProvider);

export default DeferredDataProvider;
