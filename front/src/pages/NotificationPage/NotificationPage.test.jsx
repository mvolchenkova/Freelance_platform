import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotificationPage from "./NotificationPage.jsx";

// ---------- mocks for children ----------
jest.mock("../../compCustomer/Header/Header", () => () => <div data-testid="header" />);

jest.mock("../../compCustomer/notifications/notifications", () => (props) => (
  <div data-testid="notify-item">
    notify:{props.notify?.idRequest}
  </div>
));

jest.mock("../../compAdmin/AdminNotification/AdminNotification", () => (props) => (
  <div data-testid="fine-item">fine:{props.fine?.idFine}</div>
));

jest.mock("../../compAdmin/AdminSupportNotification/AdminSupportNotification", () => (props) => (
  <div data-testid="admin-support">support:{props.record?.idSupport}</div>
));

jest.mock("../../compAdmin/CustSupportNotification/CustSupportNotification", () => (props) => (
  <div data-testid="cust-support">
    support:{props.record?.idSupport}
    {/* проверим что onDelete проброшен */}
    {typeof props.onDelete === "function" ? " hasDelete" : " noDelete"}
  </div>
));

jest.mock("../../compAdmin/AdminReportNotification/AdminReportNotification", () => (props) => (
  <div data-testid="admin-report">report:{props.report?.idReport}</div>
));

jest.mock("../../compAdmin/CustReportNotification/CustReportNotification", () => (props) => (
  <div data-testid="cust-report">
    report:{props.report?.idReport}
    {typeof props.onDelete === "function" ? " hasDelete" : " noDelete"}
  </div>
));

// ---------- mocks for slice actions/thunks ----------
const mockFetchAllUserRequests = jest.fn((id) => ({ type: "request/fetchAllUserRequests", payload: id }));
const mockFetchFinesByUserId = jest.fn((id) => ({ type: "fine/fetchFinesByUserId", payload: id }));

const mockFetchSupports = jest.fn(() => ({ type: "support/fetchSupports" }));
const mockFetchSupportByUserId = jest.fn((id) => ({ type: "support/fetchSupportByUserId", payload: id }));
const mockDeleteSupport = jest.fn((id) => ({ type: "support/deleteSupport", payload: id }));

const mockFetchReports = jest.fn(() => ({ type: "report/fetchReports" }));
const mockFetchReportsByUserId = jest.fn((id) => ({ type: "report/fetchReportsByUserId", payload: id }));
const mockDeleteReport = jest.fn((id) => ({ type: "report/deleteReport", payload: id }));

jest.mock("../../store/Slices/requestSlice", () => ({
  fetchAllUserRequests: (id) => mockFetchAllUserRequests(id),
  acceptRequest: { type: "request/acceptRequest" },
  rejectRequest: { type: "request/rejectRequest" },
}));

jest.mock("../../store/Slices/fineSlice", () => ({
  fetchFinesByUserId: (id) => mockFetchFinesByUserId(id),
}));

jest.mock("../../store/Slices/supportSlice", () => ({
  fetchSupports: () => mockFetchSupports(),
  fetchSupportByUserId: (id) => mockFetchSupportByUserId(id),
  deleteSupport: (id) => mockDeleteSupport(id),
}));

jest.mock("../../store/Slices/reportSlice", () => ({
  fetchReports: () => mockFetchReports(),
  fetchReportsByUserId: (id) => mockFetchReportsByUserId(id),
  deleteReport: (id) => mockDeleteReport(id),
}));

// ---------- react-redux mock ----------
const mockDispatch = jest.fn((arg) => arg);

let mockState = {
  request: { request: [], status: "idle" },
  fine: { fines: [] },
  support: { supports: [] },
  report: { reports: [] },
  users: { users: { data: [] } },
};

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selectorFn) => selectorFn(mockState),
}));

describe("NotificationPage", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockFetchAllUserRequests.mockClear();
    mockFetchFinesByUserId.mockClear();
    mockFetchSupports.mockClear();
    mockFetchSupportByUserId.mockClear();
    mockDeleteSupport.mockClear();
    mockFetchReports.mockClear();
    mockFetchReportsByUserId.mockClear();
    mockDeleteReport.mockClear();

    mockState = {
      request: { request: [], status: "idle" },
      fine: { fines: [] },
      support: { supports: [] },
      report: { reports: [] },
      users: { users: { data: [] } },
    };

    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  test("status=loading -> показывает loading", () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ user: { id: 1, role: "admin" } }));
    mockState.request.status = "loading";

    render(<NotificationPage />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  test("admin: диспатчит fetchAllUserRequests + fetchFinesByUserId + fetchSupports + fetchReports", () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ user: { id: 1, role: "admin" } }));

    render(<NotificationPage />);

    // request & fines always for id
    expect(mockFetchAllUserRequests).toHaveBeenCalledWith(1);
    expect(mockFetchFinesByUserId).toHaveBeenCalledWith(1);

    // admin paths
    expect(mockFetchSupports).toHaveBeenCalledTimes(1);
    expect(mockFetchSupportByUserId).not.toHaveBeenCalled();

    expect(mockFetchReports).toHaveBeenCalledTimes(1);
    expect(mockFetchReportsByUserId).not.toHaveBeenCalled();
  });

  test("customer: диспатчит fetchAllUserRequests + fetchFinesByUserId + fetchSupportByUserId + fetchReportsByUserId", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 7, role: "customer" } })
    );

    render(<NotificationPage />);

    expect(mockFetchAllUserRequests).toHaveBeenCalledWith(7);
    expect(mockFetchFinesByUserId).toHaveBeenCalledWith(7);

    expect(mockFetchSupportByUserId).toHaveBeenCalledWith(7);
    expect(mockFetchSupports).not.toHaveBeenCalled();

    expect(mockFetchReportsByUserId).toHaveBeenCalledWith(7);
    expect(mockFetchReports).not.toHaveBeenCalled();
  });

  test("рендерит все типы уведомлений для admin (requests + fines + admin supports + admin reports active)", () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ user: { id: 1, role: "admin" } }));

    mockState.request.request = [
      { idRequest: 1, createdAt: "2024-01-01T00:00:00Z" },
      { idRequest: 2, createdAt: "2025-01-01T00:00:00Z" },
    ];
    mockState.fine.fines = [{ idFine: 10 }, { idFine: 11 }];
    mockState.support.supports = [{ idSupport: 100 }, { idSupport: 101 }];

    // admin: показываем те, у кого нет Status или Status === 'pending'
    mockState.report.reports = [
      { idReport: 200, Status: "viewed" },        // скрыт
      { idReport: 201, Status: "pending" },       // показ
      { idReport: 202 },                          // показ
      { idReport: 203, Status: "denied" },        // скрыт
    ];

    render(<NotificationPage />);

    // requests
    expect(screen.getAllByTestId("notify-item")).toHaveLength(2);

    // fines
    expect(screen.getAllByTestId("fine-item")).toHaveLength(2);

    // admin supports
    expect(screen.getAllByTestId("admin-support")).toHaveLength(2);
    expect(screen.queryByTestId("cust-support")).not.toBeInTheDocument();

    // admin reports: only active (pending or empty)
    expect(screen.getAllByTestId("admin-report")).toHaveLength(2);
    expect(screen.queryByTestId("cust-report")).not.toBeInTheDocument();
  });

  test("рендерит уведомления для customer (cust supports + cust reports where Status exists)", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ user: { id: 7, role: "customer" } })
    );

    mockState.support.supports = [{ idSupport: 1 }, { idSupport: 2 }];

    // customer: показываем только where Status truthy
    mockState.report.reports = [
      { idReport: 10 },                 // скрыт
      { idReport: 11, Status: "viewed" }, // показ
      { idReport: 12, Status: "denied" }, // показ
    ];

    render(<NotificationPage />);

    // cust supports
    const custSupports = screen.getAllByTestId("cust-support");
    expect(custSupports).toHaveLength(2);
    custSupports.forEach((el) => expect(el).toHaveTextContent("hasDelete"));

    // cust reports (only with Status)
    const custReports = screen.getAllByTestId("cust-report");
    expect(custReports).toHaveLength(2);
    custReports.forEach((el) => expect(el).toHaveTextContent("hasDelete"));

    // admin notifications not visible
    expect(screen.queryByTestId("admin-support")).not.toBeInTheDocument();
    expect(screen.queryByTestId("admin-report")).not.toBeInTheDocument();
  });
});
