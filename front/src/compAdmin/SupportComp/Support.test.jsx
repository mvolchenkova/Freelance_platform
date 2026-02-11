// src/compAdmin/SupportComp/Support.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Support from "./SupportComp";

// --- MUI mock ---
jest.mock("@mui/material", () => ({
  Box: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

// --- slice thunks mock ---
const mockFetchSupports = jest.fn(() => ({ type: "support/fetchSupports" }));
const mockUpdateSupport = jest.fn((payload) => ({ type: "support/updateSupport", payload }));
const mockCreateSupport = jest.fn((payload) => ({ type: "support/createSupport", payload }));

jest.mock("../../store/Slices/supportSlice", () => ({
  fetchSupports: () => mockFetchSupports(),
  updateSupport: (payload) => mockUpdateSupport(payload),
  createSupport: (payload) => mockCreateSupport(payload),
}));

const mockFetchUsers = jest.fn(() => ({ type: "users/fetchUsers" }));
jest.mock("../../store/Slices/userSlicer", () => ({
  fetchUsers: () => mockFetchUsers(),
}));

// --- react-redux mock ---
const mockDispatch = jest.fn((arg) => arg);
let mockState = {
  support: { supports: [], status: "idle", error: null },
  users: { users: { data: [] } },
};

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selectorFn) => selectorFn(mockState),
}));

describe("Support", () => {
  const RealDate = Date;

  beforeEach(() => {
    mockDispatch.mockClear();
    mockFetchSupports.mockClear();
    mockFetchUsers.mockClear();
    mockUpdateSupport.mockClear();
    mockCreateSupport.mockClear();

    mockState = {
      support: { supports: [], status: "idle", error: null },
      users: { users: { data: [] } },
    };

    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 777, role: "user" } })
    );

    window.alert = jest.fn();
    Object.defineProperty(window, "location", {
      value: { reload: jest.fn() },
      writable: true,
    });

    // убираем шумные логи
    jest.spyOn(console, "log").mockImplementation(() => {});
    // убираем warning про act (не ошибка, просто мусор в консоли)
    jest.spyOn(console, "error").mockImplementation(() => {});

    // фиксируем дату
    global.Date = class extends RealDate {
      constructor(...args) {
        if (args.length) return super(...args);
        return new RealDate("2020-01-01T00:00:00.000Z");
      }
      static now() {
        return new RealDate("2020-01-01T00:00:00.000Z").getTime();
      }
    };
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
    global.Date = RealDate;
  });

  test("на mount диспатчит fetchSupports и fetchUsers", () => {
    render(<Support />);

    expect(mockFetchSupports).toHaveBeenCalledTimes(1);
    expect(mockFetchUsers).toHaveBeenCalledTimes(1);

    const dispatched = mockDispatch.mock.calls.map((c) => c[0]);
    expect(dispatched).toContainEqual(mockFetchSupports.mock.results[0].value);
    expect(dispatched).toContainEqual(mockFetchUsers.mock.results[0].value);
  });

  test("если status=loading, показывает Loading", () => {
    mockState.support.status = "loading";
    render(<Support />);
    expect(screen.getByText(/Loading support requests/i)).toBeInTheDocument();
  });

  test("если status=failed, показывает Error", () => {
    mockState.support.status = "failed";
    mockState.support.error = "boom";
    render(<Support />);
    expect(screen.getByText(/Error: boom/i)).toBeInTheDocument();
  });

  test("обычный пользователь: показывает форму вопроса и dispatch createSupport с payload", () => {
    render(<Support />);

    expect(screen.getByText(/You can ask your question below/i)).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(/Enter your question/i);
    fireEvent.change(textarea, { target: { value: "Hello support" } });

    fireEvent.click(screen.getByRole("button", { name: /Send Question/i }));

    expect(mockCreateSupport).toHaveBeenCalledTimes(1);
    expect(mockCreateSupport.mock.calls[0][0]).toEqual({
      question: "Hello support",
      timeOfAsk: "2020-01-01T00:00:00.000Z",
      UserIdUser: 777,
    });

    expect(window.alert).toHaveBeenCalledWith("Your question has been sent!");
    expect(textarea).toHaveValue("");
  });

  test("админ: показывает только записи без answer и может отправить ответ (updateSupport + alert + reload) + имя/почта", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 1, role: "admin" } })
    );

    mockState.support.supports = [
      { idSupport: 10, question: "Q1", answer: null, UserIdUser: "5" },
      { idSupport: 11, question: "Q2", answer: "already answered", UserIdUser: "6" },
    ];

    mockState.users.users.data = [
      { idUser: 5, login: "john", email: "john@mail.com" },
      { idUser: 6, login: "kate", email: "kate@mail.com" },
    ];

    render(<Support />);

    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.queryByText("Q2")).not.toBeInTheDocument();

    // ✅ Проверка имени: берём strong "Name:" и проверяем, что родительский <p> содержит "john"
    const nameStrong = screen.getByText("Name:");
    expect(nameStrong.closest("p")).toHaveTextContent("john");

    // ✅ Проверка почты: аналогично
    const emailStrong = screen.getByText("Email:");
    expect(emailStrong.closest("p")).toHaveTextContent("john@mail.com");

    const responseArea = screen.getByPlaceholderText(/Write your response/i);
    fireEvent.change(responseArea, { target: { value: "My answer" } });

    fireEvent.click(screen.getByRole("button", { name: /Send Response/i }));

    expect(mockUpdateSupport).toHaveBeenCalledTimes(1);
    expect(mockUpdateSupport).toHaveBeenCalledWith({
      id: 10,
      data: { answer: "My answer" },
    });

    expect(window.alert).toHaveBeenCalledWith("Answer is sent");
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(responseArea).toHaveValue("");
  });

  test("админ: если ответ пустой/пробелы, updateSupport НЕ диспатчится", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 1, role: "admin" } })
    );

    mockState.support.supports = [{ idSupport: 10, question: "Q1", answer: null, UserIdUser: "5" }];
    mockState.users.users.data = [{ idUser: 5, login: "john", email: "john@mail.com" }];

    render(<Support />);

    const responseArea = screen.getByPlaceholderText(/Write your response/i);
    fireEvent.change(responseArea, { target: { value: "   " } });

    fireEvent.click(screen.getByRole("button", { name: /Send Response/i }));

    expect(mockUpdateSupport).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalledWith("Answer is sent");
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  test("админ: если supports пустой, показывает No support records found", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 1, role: "admin" } })
    );

    mockState.support.supports = [];
    render(<Support />);

    expect(screen.getByText(/No support records found/i)).toBeInTheDocument();
  });
});
