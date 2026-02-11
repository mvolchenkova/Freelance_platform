// src/compAdmin/ReportComp/ReportComp.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReportComp from "./ReportComp";

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
const mockFetchReports = jest.fn(() => ({ type: "report/fetchReports" }));
const mockCreateReport = jest.fn((payload) => ({ type: "report/createReport", payload }));
const mockUpdateReport = jest.fn((payload) => ({ type: "report/updateReport", payload }));

jest.mock("../../store/Slices/reportSlice", () => ({
  fetchReports: () => mockFetchReports(),
  createReport: (payload) => mockCreateReport(payload),
  updateReport: (payload) => mockUpdateReport(payload),
}));

const mockFetchUsers = jest.fn(() => ({ type: "users/fetchUsers" }));
jest.mock("../../store/Slices/userSlicer", () => ({
  fetchUsers: () => mockFetchUsers(),
}));

// --- react-redux mock ---
const mockDispatch = jest.fn((arg) => arg);
let mockState = {
  report: { reports: [] },
  users: { users: { data: [] } },
};

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selectorFn) => selectorFn(mockState),
}));

describe("ReportComp", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockFetchReports.mockClear();
    mockFetchUsers.mockClear();
    mockCreateReport.mockClear();
    mockUpdateReport.mockClear();

    mockState = {
      report: { reports: [] },
      users: { users: { data: [] } },
    };

    // убрать шум
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    console.log.mockRestore();
  });

  test("admin: на mount диспатчит fetchReports и fetchUsers", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 1, role: "admin" } })
    );

    render(<ReportComp />);

    expect(mockFetchReports).toHaveBeenCalledTimes(1);
    expect(mockFetchUsers).toHaveBeenCalledTimes(1);

    const dispatched = mockDispatch.mock.calls.map((c) => c[0]);
    expect(dispatched).toContainEqual(mockFetchReports.mock.results[0].value);
    expect(dispatched).toContainEqual(mockFetchUsers.mock.results[0].value);
  });

  test("user: на mount диспатчит только fetchUsers (без fetchReports)", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 10, role: "user" } })
    );

    render(<ReportComp />);

    expect(mockFetchReports).not.toHaveBeenCalled();
    expect(mockFetchUsers).toHaveBeenCalledTimes(1);

    const dispatched = mockDispatch.mock.calls.map((c) => c[0]);
    expect(dispatched).toContainEqual(mockFetchUsers.mock.results[0].value);
  });

  test("admin: показывает только необработанные reports (без Status) и отображает логины + reason", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 1, role: "admin" } })
    );

    mockState.users.users.data = [
      { idUser: 1, login: "admin", email: "a@a.com" },
      { idUser: 2, login: "alice", email: "alice@mail.com" },
      { idUser: 3, login: "bob", email: "bob@mail.com" },
    ];

    mockState.report.reports = [
      { idReport: 100, idReportedByUser: 2, idReportedUser: 3, Reason: "spam", Status: null },
      { idReport: 101, idReportedByUser: 3, idReportedUser: 2, Reason: "abuse", Status: "viewed" }, // скрыт
      { idReport: 102, idReportedByUser: 2, idReportedUser: 3, Reason: "scam" }, // показываем
    ];

    render(<ReportComp />);

    expect(screen.getByText(/All Reports/i)).toBeInTheDocument();

    // abuse скрыт
    expect(screen.queryByText("abuse")).not.toBeInTheDocument();

    // проверяем From/Against логины (в обеих карточках)
    const fromStrong = screen.getAllByText("From:");
    const againstStrong = screen.getAllByText("Against:");
    fromStrong.forEach((el) => expect(el.closest("p")).toHaveTextContent("alice"));
    againstStrong.forEach((el) => expect(el.closest("p")).toHaveTextContent("bob"));

    // ✅ Reason: проверяем через родителя <p>, потому что текст разбит
    const reasonStrongEls = screen.getAllByText("Reason:");
    // должно быть 2 карточки -> 2 "Reason:"
    expect(reasonStrongEls).toHaveLength(2);
    expect(reasonStrongEls[0].closest("p")).toHaveTextContent("spam");
    expect(reasonStrongEls[1].closest("p")).toHaveTextContent("scam");
  });

  test("admin: клик View диспатчит updateReport(Status=viewed) с правильным id", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 1, role: "admin" } })
    );

    mockState.users.users.data = [
      { idUser: 2, login: "alice" },
      { idUser: 3, login: "bob" },
    ];

    mockState.report.reports = [
      { idReport: 100, idReportedByUser: 2, idReportedUser: 3, Reason: "spam" },
    ];

    render(<ReportComp />);

    fireEvent.click(screen.getByRole("button", { name: /View/i }));

    expect(mockUpdateReport).toHaveBeenCalledTimes(1);
    expect(mockUpdateReport).toHaveBeenCalledWith({
      id: 100,
      data: { Status: "viewed" },
    });

    const dispatched = mockDispatch.mock.calls.map((c) => c[0]);
    expect(dispatched).toContainEqual(mockUpdateReport.mock.results[0].value);
  });

  test("admin: клик Deny диспатчит updateReport(Status=denied) с правильным id", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 1, role: "admin" } })
    );

    mockState.users.users.data = [
      { idUser: 2, login: "alice" },
      { idUser: 3, login: "bob" },
    ];

    mockState.report.reports = [
      { idReport: 100, idReportedByUser: 2, idReportedUser: 3, Reason: "spam" },
    ];

    render(<ReportComp />);

    fireEvent.click(screen.getByRole("button", { name: /Deny/i }));

    expect(mockUpdateReport).toHaveBeenCalledTimes(1);
    expect(mockUpdateReport).toHaveBeenCalledWith({
      id: 100,
      data: { Status: "denied" },
    });

    const dispatched = mockDispatch.mock.calls.map((c) => c[0]);
    expect(dispatched).toContainEqual(mockUpdateReport.mock.results[0].value);
  });

  test("user: показывает форму, select не содержит текущего пользователя, submit диспатчит createReport и очищает поля", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 10, role: "user" } })
    );

    mockState.users.users.data = [
      { idUser: 10, login: "me" },
      { idUser: 11, login: "alice" },
      { idUser: 12, login: "bob" },
    ];

    render(<ReportComp />);

    expect(screen.getByText(/Submit a Report/i)).toBeInTheDocument();

    const select = screen.getByRole("combobox");
    const textarea = screen.getByRole("textbox");

    expect(screen.queryByRole("option", { name: "me" })).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "alice" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "bob" })).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "11" } });
    fireEvent.change(textarea, { target: { value: "User is spamming" } });

    fireEvent.click(screen.getByRole("button", { name: /Submit Report/i }));

    expect(mockCreateReport).toHaveBeenCalledTimes(1);
    expect(mockCreateReport).toHaveBeenCalledWith({
      idReportedByUser: 10,
      idReportedUser: "11",
      Reason: "User is spamming",
    });

    expect(select).toHaveValue("");
    expect(textarea).toHaveValue("");
  });

  test("user: если не заполнить поля, createReport не диспатчится", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 10, role: "user" } })
    );

    mockState.users.users.data = [{ idUser: 11, login: "alice" }];

    render(<ReportComp />);

    fireEvent.click(screen.getByRole("button", { name: /Submit Report/i }));
    expect(mockCreateReport).not.toHaveBeenCalled();
  });
});
