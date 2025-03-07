import { render, screen, fireEvent } from "@testing-library/react";
import FileDownloadList from "./FileDownloadList";

jest.mock('../DownloadList/DownloadList', () => jest.fn(() => null));

describe("FileDownloadList", () => {

    const DownloadListMock = require('../DownloadList/DownloadList');

    const expectedFields = [
        {
            name: 'name',
            label: 'Name',
            class: 'name-field'
        },
        {
            name: 'device',
            label: 'Device',
            class: 'device-field'
        },
        {
            name: 'path',
            label: 'Path',
            class: 'path-field'
        },
        {
            name: 'status',
            label: 'Status',
            class: 'status-field'
        }
    ]

    test("calls DownloadList", () => {
        render(<FileDownloadList data={[]}/>);
        expect(DownloadListMock).toHaveBeenCalled();
    });

    test("passes the fields prop to DownloadList", () => {
        render(<FileDownloadList data={[]}/>);
        expect(DownloadListMock.mock.calls).toHaveLength(1);
        expect(DownloadListMock.mock.calls[0][0].fields).toMatchObject(expectedFields);
    });

    test("sets the item id field to the file path", () => {
        const testData = [{name: "test-name", device: "test-device", path: "test-path", status: "test-status"}];

        render(<FileDownloadList data={testData}/>);
        expect(DownloadListMock.mock.calls).toHaveLength(1);
        expect(DownloadListMock.mock.calls[0][0].items[0].id).toEqual(testData[0].path);
    });

    test("sets the item shortDesc field to the device + file path", () => {
        const testData = [{name: "test-name", device: "test-device", path: "test-path", status: "test-status"}];

        render(<FileDownloadList data={testData}/>);
        expect(DownloadListMock.mock.calls).toHaveLength(1);
        expect(DownloadListMock.mock.calls[0][0].items[0].shortDesc).toEqual(`${testData[0].device} - ${testData[0].path}`);
    });

    test("sets the item disabled field to true if status != available", () => {
        const testData = [{name: "test-name", device: "test-device", path: "test-path", status: "test-status"}];

        render(<FileDownloadList data={testData}/>);
        expect(DownloadListMock.mock.calls).toHaveLength(1);
        expect(DownloadListMock.mock.calls[0][0].items[0].disabled).toEqual(true);
    });

    test("sets the item disabled field to false if status = available", () => {
        const testData = [{name: "test-name", device: "test-device", path: "test-path", status: "available"}];

        render(<FileDownloadList data={testData}/>);
        expect(DownloadListMock.mock.calls).toHaveLength(1);
        expect(DownloadListMock.mock.calls[0][0].items[0].disabled).toEqual(false);
    });

    test("capitalizes the status field", () => {
        const testData = [{name: "test-name", device: "test-device", path: "test-path", status: "test-status"}];

        render(<FileDownloadList data={testData}/>);
        expect(DownloadListMock.mock.calls).toHaveLength(1);
        expect(DownloadListMock.mock.calls[0][0].items[0].properties.status).toEqual('Test-status');
    });
});