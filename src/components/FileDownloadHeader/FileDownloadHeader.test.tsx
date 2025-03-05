import { render, screen } from "@testing-library/react";
import { FileDownloadHeader } from "./FileDownloadHeader";

describe("FileDownloadHeader", () => {

    const clickSelectAllMock = jest.fn();
    const clickDownloadMock = jest.fn();

    test("renders the field names", () => {
        render(<table><thead><FileDownloadHeader numSelected={0} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);

        const name = screen.getByText("Name");
        const device = screen.getByText("Device");
        const path = screen.getByText("Path");
        const status = screen.getByText("Status");

        expect(name).toBeInTheDocument();
        expect(device).toBeInTheDocument();
        expect(path).toBeInTheDocument();
        expect(status).toBeInTheDocument();
    });

    test("renders 'None Selected' if numSelected = 0", () => {
        render(<table><thead><FileDownloadHeader numSelected={0} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const numSelectedText = screen.getByText("None Selected");
        expect(numSelectedText).toBeInTheDocument();
    });

    test("renders # of selected if numSelected > 0", () => {
        render(<table><thead><FileDownloadHeader numSelected={1} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const numSelectedText = screen.getByText("Selected 1");
        expect(numSelectedText).toBeInTheDocument();
    });

    test("disables download button if numSelected = 0", () => {
        render(<table><thead><FileDownloadHeader numSelected={0} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    test("enables download button if numSelected > 0", () => {
        render(<table><thead><FileDownloadHeader numSelected={1} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const button = screen.getByRole("button");
        expect(button).not.toBeDisabled();
    });

    test("disables Select All checkbox if selectAllState = disabled", () => {
        render(<table><thead><FileDownloadHeader numSelected={0} selectAllState="disabled" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDisabled();
    });

    test("checks Select All checkbox if selectAllState = checked", () => {
        render(<table><thead><FileDownloadHeader numSelected={0} selectAllState="checked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    test("unchecks Select All checkbox if selectAllState = unchecked", () => {
        render(<table><thead><FileDownloadHeader numSelected={0} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    test("marks Select All checkbox as indeterminate if selectAllState = indeterminate", () => {
        render(<table><thead><FileDownloadHeader numSelected={0} selectAllState="indeterminate" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBePartiallyChecked();
    });

    test("calls clickSelectAll when Select All checkbox is clicked", () => {
        render(<table><thead><FileDownloadHeader numSelected={0} selectAllState="indeterminate" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const checkbox = screen.getByRole("checkbox");
        checkbox.click();
        expect(clickSelectAllMock).toHaveBeenCalled();
    });

    test("calls clickDownload when download button is clicked", () => {
        render(<table><thead><FileDownloadHeader numSelected={1} selectAllState="indeterminate" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/></thead></table>);
        const button = screen.getByRole("button");
        button.click();
        expect(clickDownloadMock).toHaveBeenCalled();
    });
});