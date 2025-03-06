import { render, screen, fireEvent } from "@testing-library/react";
import DownloadList from "./DownloadList";

describe("DownloadList", () => {

    const testFields = [
        {
            name: 'field1',
            label: 'Field 1',
            class: 'field1-class'
        },
        {
            name: 'field2',
            label: 'Field 2',
            class: 'field2-class'
        },
        {
            name: 'field3',
            label: 'Field 3',
            class: 'field3-class'
        }
    ]

    const testItem1 = {
        id: 'testItem1Id',
        shortDesc: 'Test Item 1',
        disabled: false,
        properties: {
            field1: "Test Item 1 - Field 1",
            field2: "Test Item 1 - Field 2",
            field3: "Test Item 1 - Field 3"
        }
    }

    const testItem2 = {
        id: 'testItem2Id',
        shortDesc: 'Test Item 2',
        disabled: false,
        properties: {
            field1: "Test Item 2 - Field 1",
            field2: "Test Item 2 - Field 2",
            field3: "Test Item 2 - Field 3"
        }
    }

    test("renders 'There is nothing to display' if fields is empty", () => {
        render(<DownloadList items={[testItem1, testItem2]} fields={[]}/>);
        const placeholderText = screen.getByText("There is nothing to display");
        expect(placeholderText).toBeInTheDocument();
    });

    test("renders 'No items found' if items is empty", () => {
        render(<DownloadList items={[]} fields={testFields}/>);
        const placeholderText = screen.getByText("No items found");
        expect(placeholderText).toBeInTheDocument();
    });

    test("renders item data if not empty", () => {
        render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        
        const device1field1 = screen.getByText(testItem1.properties.field1);
        const device1field2 = screen.getByText(testItem1.properties.field2);
        const device1field3 = screen.getByText(testItem1.properties.field3);

        const device2field1 = screen.getByText(testItem2.properties.field1);
        const device2field2 = screen.getByText(testItem2.properties.field2);
        const device2field3 = screen.getByText(testItem2.properties.field3);

        expect(device1field1).toBeInTheDocument();
        expect(device1field2).toBeInTheDocument();
        expect(device1field3).toBeInTheDocument();

        expect(device2field1).toBeInTheDocument();
        expect(device2field2).toBeInTheDocument();
        expect(device2field3).toBeInTheDocument();
    });

    test("renders the field names", () => {
        render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);

        const field1 = screen.getByText(testFields[0].label);
        const field2 = screen.getByText(testFields[1].label);
        const field3 = screen.getByText(testFields[2].label);

        expect(field1).toBeInTheDocument();
        expect(field2).toBeInTheDocument();
        expect(field3).toBeInTheDocument();
    });


    test("updates the number of selected items and when the user clicks an item", () => {
        const { container } = render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        const checkbox = container.getElementsByClassName("item-checkbox")[0];
        
        fireEvent.click(checkbox);
        
        const numSelectedText = screen.getByText("Selected 1");
        expect(numSelectedText).toBeInTheDocument();
    });

    test("updates the Select All checkbox when the user clicks an item", () => {
        const { container } = render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        const fileCheckboxes = container.getElementsByClassName("item-checkbox");
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];

        fireEvent.click(fileCheckboxes[0]);
        expect(selectAll).toBePartiallyChecked();

        fireEvent.click(fileCheckboxes[1]);
        expect(selectAll).toBeChecked();

        fireEvent.click(fileCheckboxes[0]);
        expect(selectAll).toBePartiallyChecked();

        fireEvent.click(fileCheckboxes[1]);
        expect(selectAll).not.toBeChecked();
    });

    test("updates the number of selected files when the user clicks Select All", () => {
        const { container } = render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        const checkbox = container.getElementsByClassName("select-all-checkbox")[0];
        
        fireEvent.click(checkbox);
        const numSelectedText = screen.getByText("Selected 2");
        expect(numSelectedText).toBeInTheDocument();

        fireEvent.click(checkbox);
        const noneSelectedText = screen.getByText("None Selected");
        expect(noneSelectedText).toBeInTheDocument();
    });

    test("updates the Select All checkbox when the user clicks Select All", () => {
        const { container } = render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        
        fireEvent.click(selectAll);
        expect(selectAll).toBeChecked();

        fireEvent.click(selectAll);
        expect(selectAll).not.toBeChecked();

        const fileCheckboxes = container.getElementsByClassName("item-checkbox");
        fireEvent.click(fileCheckboxes[0]);
        expect(selectAll).toBePartiallyChecked();
        
        fireEvent.click(selectAll);
        expect(selectAll).toBeChecked();
    });

    test("shows the modal when the user clicks the download button", () => {
        const { container } = render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        fireEvent.click(selectAll);

        const downloadBtn = container.getElementsByClassName("download-btn");
        fireEvent.click(downloadBtn[0]);
        
        const modalHeader = screen.getByText("Downloaded Items");
        expect(modalHeader).toBeInTheDocument();
    });

    test("closes the modal when the user clicks the OK button", () => {
        const { container } = render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        fireEvent.click(selectAll);

        const downloadBtn = container.getElementsByClassName("download-btn");
        fireEvent.click(downloadBtn[0]);
        
        const okBtn = screen.getByText("OK");
        fireEvent.click(okBtn);

        const modalHeader = screen.queryByText("Downloaded Items");
        expect(modalHeader).toBeNull();
    });

    test("clears the Select All checkbox when the user clicks the OK button on the modal", () => {
        const { container } = render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        fireEvent.click(selectAll);

        const downloadBtn = container.getElementsByClassName("download-btn");
        fireEvent.click(downloadBtn[0]);
        
        const okBtn = screen.getByText("OK");
        fireEvent.click(okBtn);

        expect(selectAll).not.toBeChecked();
    });

    test("clears the selected files when the user clicks the OK button on the modal", () => {
        const { container } = render(<DownloadList items={[testItem1, testItem2]} fields={testFields}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        fireEvent.click(selectAll);

        const downloadBtn = container.getElementsByClassName("download-btn");
        fireEvent.click(downloadBtn[0]);
        
        const okBtn = screen.getByText("OK");
        fireEvent.click(okBtn);

        const noneSelectedText = screen.getByText("None Selected");
        expect(noneSelectedText).toBeInTheDocument();
    });

});