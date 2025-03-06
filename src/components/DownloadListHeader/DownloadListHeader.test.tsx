import { render, screen } from "@testing-library/react";
import { DownloadListHeader } from "./DownloadListHeader";

describe("DownloadListHeader", () => {

    const clickSelectAllMock = jest.fn();
    const clickDownloadMock = jest.fn();

    test("renders 'None Selected' if numSelected = 0", () => {
        render(<DownloadListHeader numSelected={0} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const numSelectedText = screen.getByText("None Selected");
        expect(numSelectedText).toBeInTheDocument();
    });

    test("renders # of selected if numSelected > 0", () => {
        render(<DownloadListHeader numSelected={1} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const numSelectedText = screen.getByText("Selected 1");
        expect(numSelectedText).toBeInTheDocument();
    });

    test("disables download button if numSelected = 0", () => {
        render(<DownloadListHeader numSelected={0} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    test("enables download button if numSelected > 0", () => {
        render(<DownloadListHeader numSelected={1} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const button = screen.getByRole("button");
        expect(button).not.toBeDisabled();
    });

    test("disables Select All checkbox if selectAllState = disabled", () => {
        render(<DownloadListHeader numSelected={0} selectAllState="disabled" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDisabled();
    });

    test("checks Select All checkbox if selectAllState = checked", () => {
        render(<DownloadListHeader numSelected={0} selectAllState="checked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    test("unchecks Select All checkbox if selectAllState = unchecked", () => {
        render(<DownloadListHeader numSelected={0} selectAllState="unchecked" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    test("marks Select All checkbox as indeterminate if selectAllState = indeterminate", () => {
        render(<DownloadListHeader numSelected={0} selectAllState="indeterminate" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBePartiallyChecked();
    });

    test("calls clickSelectAll when Select All checkbox is clicked", () => {
        render(<DownloadListHeader numSelected={0} selectAllState="indeterminate" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const checkbox = screen.getByRole("checkbox");
        checkbox.click();
        expect(clickSelectAllMock).toHaveBeenCalled();
    });

    test("calls clickDownload when download button is clicked", () => {
        render(<DownloadListHeader numSelected={1} selectAllState="indeterminate" clickSelectAll={clickSelectAllMock} clickDownload={clickDownloadMock}/>);
        const button = screen.getByRole("button");
        button.click();
        expect(clickDownloadMock).toHaveBeenCalled();
    });
});