import { render, screen } from "@testing-library/react";
import { DownloadListRow } from "./DownloadListRow";

describe("DownloadListRow", () => {

    const clickItemMock = jest.fn();

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

    const testItem = {
        id: 'testItemId',
        shortDesc: 'Test Item',
        disabled: false,
        properties: {
            field1: "Test Item - Field 1",
            field2: "Test Item - Field 2",
            field3: "Test Item - Field 3"
        }
    }

    const testEmptyItem = {
        id: 'testEmptyItemId',
        shortDesc: 'Test Empty Item',
        properties: {}
    }

    const testDisabledItem = {
        id: 'testDisabledItemId',
        shortDesc: 'Test Disabled Item',
        disabled: true,
        properties: {
            field1: "Test Disabled Item - Field 1",
            field2: "Test Disabled Item - Field 2",
            field3: "Test Disabled Item - Field 3"
        }
    }

    test("renders nothing if no fields were specified", () => {
        render(<table><tbody><DownloadListRow item={testItem} selected={false} fields={[]} clickItem={clickItemMock}/></tbody></table>);
        const checkbox = screen.queryByRole("checkbox");
        expect(checkbox).toBeNull();
    })

    test("renders nothing if the file has no properties were specified", () => {
        render(<table><tbody><DownloadListRow item={testEmptyItem} selected={false} fields={[]} clickItem={clickItemMock}/></tbody></table>);
        const checkbox = screen.queryByRole("checkbox");
        expect(checkbox).toBeNull();
    })

    test("renders item information", () => {
        render(<table><tbody><DownloadListRow item={testItem} selected={false} fields={testFields} clickItem={clickItemMock}/></tbody></table>);

        const field1 = screen.getByText(testItem.properties.field1);
        const field2 = screen.getByText(testItem.properties.field2);
        const field3 = screen.getByText(testItem.properties.field3);

        expect(field1).toBeInTheDocument();
        expect(field2).toBeInTheDocument();
        expect(field3).toBeInTheDocument();
    });

    test("is clickable for non-disabled item", () => {
        const { container } = render(<table><tbody><DownloadListRow item={testItem} selected={false} fields={testFields} clickItem={clickItemMock}/></tbody></table>);
        expect(container.getElementsByClassName("clickable").length).toBe(1);
        
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeDisabled();
    });

    test("is not clickable for disabled file", () => {
        const { container } = render(<table><tbody><DownloadListRow item={testDisabledItem} selected={false} fields={testFields} clickItem={clickItemMock}/></tbody></table>);
        expect(container.getElementsByClassName("clickable").length).toBe(0);
        
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDisabled();
    });

    test("checks the checkbox when selected = true", () => {
        render(<table><tbody><DownloadListRow item={testItem} selected={true} fields={testFields} clickItem={clickItemMock}/></tbody></table>);        
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    test("doesn't check the checkbox when selected = false", () => {
        render(<table><tbody><DownloadListRow item={testItem} selected={false} fields={testFields} clickItem={clickItemMock}/></tbody></table>);        
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    test("calls clickItem when clicked", () => {
        render(<table><tbody><DownloadListRow item={testItem} selected={false} fields={testFields} clickItem={clickItemMock}/></tbody></table>);        
        const checkbox = screen.getByRole("checkbox");
        checkbox.click();
        expect(clickItemMock).toHaveBeenCalled();
    });

});