import { render, screen, fireEvent } from "@testing-library/react";
import FileDownloadList from "./FileDownloadList";

describe("FileDownloadList", () => {

    const file1 = {name: "file1", device: "device1", path: "path1", status: "available"};
    const file2 = {name: "file2", device: "device2", path: "path2", status: "available"};

    test("renders 'No files found' if data is empty", () => {
        render(<FileDownloadList data={[]}/>);
        const placeholderText = screen.getByText("No files found");
        expect(placeholderText).toBeInTheDocument();
    });

    test("renders file data if not empty", () => {
        render(<FileDownloadList data={[file1, file2]}/>);
        
        const device1 = screen.getByText(file1.device);
        const path1 = screen.getByText(file1.path);
        const device2 = screen.getByText(file2.device);
        const path2 = screen.getByText(file2.path);

        expect(device1).toBeInTheDocument();
        expect(path1).toBeInTheDocument();
        expect(device2).toBeInTheDocument();
        expect(path2).toBeInTheDocument();
    });

    test("renders file data if not empty", () => {
        render(<FileDownloadList data={[file1, file2]}/>);
        
        const device1 = screen.getByText(file1.device);
        const path1 = screen.getByText(file1.path);
        const device2 = screen.getByText(file2.device);
        const path2 = screen.getByText(file2.path);

        expect(device1).toBeInTheDocument();
        expect(path1).toBeInTheDocument();
        expect(device2).toBeInTheDocument();
        expect(path2).toBeInTheDocument();
    });

    test("updates the number of selected files and when the user clicks a file", () => {
        const { container } = render(<FileDownloadList data={[file1, file2]}/>);
        const checkbox = container.getElementsByClassName("file-checkbox")[0];
        
        fireEvent.click(checkbox);
        
        const numSelectedText = screen.getByText("Selected 1");
        expect(numSelectedText).toBeInTheDocument();
    });

    test("updates the Select All checkbox when the user clicks a file", () => {
        const { container } = render(<FileDownloadList data={[file1, file2]}/>);
        const fileCheckboxes = container.getElementsByClassName("file-checkbox");
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
        const { container } = render(<FileDownloadList data={[file1, file2]}/>);
        const checkbox = container.getElementsByClassName("select-all-checkbox")[0];
        
        fireEvent.click(checkbox);
        const numSelectedText = screen.getByText("Selected 2");
        expect(numSelectedText).toBeInTheDocument();

        fireEvent.click(checkbox);
        const noneSelectedText = screen.getByText("None Selected");
        expect(noneSelectedText).toBeInTheDocument();
    });

    test("updates the Select All checkbox when the user clicks Select All", () => {
        const { container } = render(<FileDownloadList data={[file1, file2]}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        
        fireEvent.click(selectAll);
        expect(selectAll).toBeChecked();

        fireEvent.click(selectAll);
        expect(selectAll).not.toBeChecked();

        const fileCheckboxes = container.getElementsByClassName("file-checkbox");
        fireEvent.click(fileCheckboxes[0]);
        expect(selectAll).toBePartiallyChecked();
        
        fireEvent.click(selectAll);
        expect(selectAll).toBeChecked();
    });

    test("shows the modal when the user clicks the download button", () => {
        const { container } = render(<FileDownloadList data={[file1, file2]}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        fireEvent.click(selectAll);

        const downloadBtn = container.getElementsByClassName("download-btn");
        fireEvent.click(downloadBtn[0]);
        
        const modalHeader = screen.getByText("Downloaded Files");
        expect(modalHeader).toBeInTheDocument();
    });

    test("closes the modal when the user clicks the OK button", () => {
        const { container } = render(<FileDownloadList data={[file1, file2]}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        fireEvent.click(selectAll);

        const downloadBtn = container.getElementsByClassName("download-btn");
        fireEvent.click(downloadBtn[0]);
        
        const okBtn = screen.getByText("OK");
        fireEvent.click(okBtn);

        const modalHeader = screen.queryByText("Downloaded Files");
        expect(modalHeader).toBeNull();
    });

    test("clears the Select All checkbox when the user clicks the OK button on the modal", () => {
        const { container } = render(<FileDownloadList data={[file1, file2]}/>);
        const selectAll = container.getElementsByClassName("select-all-checkbox")[0];
        fireEvent.click(selectAll);

        const downloadBtn = container.getElementsByClassName("download-btn");
        fireEvent.click(downloadBtn[0]);
        
        const okBtn = screen.getByText("OK");
        fireEvent.click(okBtn);

        expect(selectAll).not.toBeChecked();
    });

    test("clears the selected files when the user clicks the OK button on the modal", () => {
        const { container } = render(<FileDownloadList data={[file1, file2]}/>);
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