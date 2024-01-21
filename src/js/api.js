'use strict';

/**
 * Fetch data from server
 * @param {*} url API URL [required]
 * @param {*} successCallback Success callback [required]
 * @param {*} errorCallback Error callback [optional]
 */

export async function fetchData(url, successCallback, errorCallback) {

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        successCallback(data);
    } else {
        const error = await response.json();
        errorCallback && errorCallback(error);
    }
}