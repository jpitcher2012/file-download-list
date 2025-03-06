import { render, screen } from "@testing-library/react";
import ListModal from "./ListModal";

describe("ListModal", () => {
    const mockRef = null;
    const closeModalMock = jest.fn();

    const testList = ['Item 1', 'Item 2'];

    test("renders modal when showModal = true", () => {
        render(<ListModal showModal={true} header="Test Modal" list={[]} ref={mockRef} closeModal={closeModalMock}/>);
        const modalHeader = screen.getByText("Test Modal");
        expect(modalHeader).toBeInTheDocument();
    });

    test("doesn't render modal when showModal = false", () => {
        render(<ListModal showModal={false} header="Test Modal" list={[]} ref={mockRef}  closeModal={closeModalMock}/>);
        const modalHeader = screen.queryByText("Test Modal");
        expect(modalHeader).toBeNull();
    });

    test("displays selected file information", () => {
        render(<ListModal showModal={true} header="Test Modal" list={testList} ref={mockRef} closeModal={closeModalMock}/>);

        const item1 = screen.getByText(testList[0]);
        const item2 = screen.getByText(testList[1]);

        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
    });

    test("calls closeModal when button is clicked", () => {
        render(<ListModal showModal={true} header="Test Modal" list={[]} ref={mockRef} closeModal={closeModalMock}/>);
        const button = screen.getByText("OK");
        button.click();
        expect(closeModalMock).toHaveBeenCalled();
    });
});