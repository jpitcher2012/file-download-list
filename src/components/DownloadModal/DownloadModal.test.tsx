import { render, screen } from "@testing-library/react";
import DownloadModal from "./DownloadModal";

describe("DownloadModal", () => {

    const mockRef = null;
    const closeModalMock = jest.fn();

    test("renders modal when showModal = true", () => {
        render(<DownloadModal showModal={true} files={[]} ref={mockRef} closeModal={closeModalMock}/>);
        const modalHeader = screen.getByText("Downloaded Files");
        expect(modalHeader).toBeInTheDocument();
    });

    test("doesn't render modal when showModal = false", () => {
        render(<DownloadModal showModal={false} files={[]} ref={mockRef}  closeModal={closeModalMock}/>);
        const modalHeader = screen.queryByText("Downloaded Files");
        expect(modalHeader).toBeNull();
    });

    test("displays selected file information", () => {
        const file1 = {name: "file1", device: "device1", path: "path1", status: "available"};
        const file2 = {name: "file2", device: "device2", path: "path2", status: "available"};

        render(<DownloadModal showModal={true} files={[file1, file2]} ref={mockRef} closeModal={closeModalMock}/>);

        const device1 = screen.getByText(file1.device);
        const path1 = screen.getByText(file1.path);
        const device2 = screen.getByText(file2.device);
        const path2 = screen.getByText(file2.path);

        expect(device1).toBeInTheDocument();
        expect(path1).toBeInTheDocument();
        expect(device2).toBeInTheDocument();
        expect(path2).toBeInTheDocument();
    });

    test("calls closeModal when button is clicked", () => {
        render(<DownloadModal showModal={true} files={[]} ref={mockRef} closeModal={closeModalMock}/>);
        const button = screen.getByText("OK");
        button.click();
        expect(closeModalMock).toHaveBeenCalled();
    });

});