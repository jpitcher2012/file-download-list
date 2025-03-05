import { render, screen } from "@testing-library/react";
import { FileDownloadRow } from "./FileDownloadRow";

describe("FileDownloadRow", () => {

    const clickFileMock = jest.fn();

    const testAvailableFile = {
        name: "Test Name",
        device: "Test Device",
        path: "\\test\\path",
        status: "available"
    }

    const testScheduledFile = {
        name: "Test Name",
        device: "Test Device",
        path: "\\test\\path",
        status: "scheduled"  
    }

    test("renders file information", () => {
        render(<table><tbody><FileDownloadRow file={testAvailableFile} selected={false} clickFile={clickFileMock}/></tbody></table>);

        const name = screen.getByText(testAvailableFile.name);
        const device = screen.getByText(testAvailableFile.device);
        const path = screen.getByText(testAvailableFile.path);
        const status = screen.getByText("Available");

        expect(name).toBeInTheDocument();
        expect(device).toBeInTheDocument();
        expect(path).toBeInTheDocument();
        expect(status).toBeInTheDocument();
    });

    test("is clickable for available file", () => {
        const { container } = render(<table><tbody><FileDownloadRow file={testAvailableFile} selected={false} clickFile={clickFileMock}/></tbody></table>);
        expect(container.getElementsByClassName("clickable").length).toBe(1);
        
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeDisabled();
    });

    test("is not clickable for scheduled file", () => {
        const { container } = render(<table><tbody><FileDownloadRow file={testScheduledFile} selected={false} clickFile={clickFileMock}/></tbody></table>);
        expect(container.getElementsByClassName("clickable").length).toBe(0);
        
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDisabled();
    });

    test("checks the checkbox when selected = true", () => {
        render(<table><tbody><FileDownloadRow file={testAvailableFile} selected={true} clickFile={clickFileMock}/></tbody></table>);        
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    test("doesn't check the checkbox when selected = false", () => {
        render(<table><tbody><FileDownloadRow file={testAvailableFile} selected={false} clickFile={clickFileMock}/></tbody></table>);        
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    test("calls clickFile when clicked", () => {
        render(<table><tbody><FileDownloadRow file={testAvailableFile} selected={false} clickFile={clickFileMock}/></tbody></table>);        
        const checkbox = screen.getByRole("checkbox");
        checkbox.click();
        expect(clickFileMock).toHaveBeenCalled();
    });
});