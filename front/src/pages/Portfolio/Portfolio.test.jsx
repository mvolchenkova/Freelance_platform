//npm i -D @testing-library/react @testing-library/jest-dom jest
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Portfolio from "./Portfolio";
import "@testing-library/jest-dom";

jest.mock("../../compCustomer/Header/Header", () => () => (
  <div data-testid="header">Header</div>
));

// Мокаем Button: имитируем двойной вызов func (onClickCapture + onClick)
jest.mock("../../materialuiComponents/Button", () => {
  return function MockMuiButtonLike({ text, func }) {
    return (
      <button
        type="button"
        onClick={(e) => {
          func?.(e); // capture
          func?.(e); // bubble
        }}
      >
        {text}
      </button>
    );
  };
});

// thunks mock
const mockGetByUserId = jest.fn((id) => ({ type: "portfolio/getByUserId", payload: id }));
const mockUpdPortfolio = jest.fn((payload) => ({ type: "portfolio/updPortfolio", payload }));

jest.mock("../../store/Slices/portfolioSlice", () => ({
  getByUserId: (id) => mockGetByUserId(id),
  updPortfolio: (payload) => mockUpdPortfolio(payload),
}));

// react-redux mock
const mockDispatch = jest.fn();
let mockState = {
  portfolio: {
    portfolio: {
      portfolioId: 10,
      phone: "111",
      skills: "JS, React",
      workExperience: "2 years",
      education: "BS",
    },
    error: null,
    statusPort: "idle",
  },
};

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selectorFn) => selectorFn(mockState),
}));

describe("Portfolio", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockGetByUserId.mockClear();
    mockUpdPortfolio.mockClear();

    mockState = {
      portfolio: {
        portfolio: {
          portfolioId: 10,
          phone: "111",
          skills: "JS, React",
          workExperience: "2 years",
          education: "BS",
        },
        error: null,
        statusPort: "idle",
      },
    };

    const currentUser = { user: { id: 777 } };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(currentUser));
  });

  const getControls = () => ({
    phone: document.querySelector("#phone"),
    skills: document.querySelector("#skills"),
    experience: document.querySelector("#experience"),
    education: document.querySelector("#education"),
  });

  test("рендерит форму и значения берутся из store", () => {
    render(<Portfolio />);

    expect(screen.getByTestId("header")).toBeInTheDocument();

    const { phone, skills, experience, education } = getControls();
    expect(phone).toHaveValue("111");
    expect(skills).toHaveValue("JS, React");
    expect(experience).toHaveValue("2 years");
    expect(education).toHaveValue("BS");

    expect(screen.getByRole("button", { name: /Submit Portfolio/i })).toBeInTheDocument();
  });

  test("при монтировании диспатчит getByUserId(user.user.id)", () => {
    render(<Portfolio />);

    expect(mockGetByUserId).toHaveBeenCalledWith(777);

    // проверяем, что dispatch получил то, что вернул thunk-mock
    expect(mockDispatch).toHaveBeenCalledWith(mockGetByUserId.mock.results[0].value);
  });

  test("обновляет локальные значения при вводе", () => {
    render(<Portfolio />);

    const { phone, skills, experience, education } = getControls();

    fireEvent.change(phone, { target: { value: "999" } });
    fireEvent.change(skills, { target: { value: "Node, TS" } });
    fireEvent.change(experience, { target: { value: "5 years" } });
    fireEvent.change(education, { target: { value: "MS" } });

    expect(phone).toHaveValue("999");
    expect(skills).toHaveValue("Node, TS");
    expect(experience).toHaveValue("5 years");
    expect(education).toHaveValue("MS");
  });

  test("submit: диспатчит updPortfolio с payload (учитывая двойной вызов func)", () => {
    render(<Portfolio />);

    const { phone, skills, experience, education } = getControls();

    fireEvent.change(phone, { target: { value: "222" } });
    fireEvent.change(skills, { target: { value: "React Native" } });
    fireEvent.change(experience, { target: { value: "3 years" } });
    fireEvent.change(education, { target: { value: "College" } });

    fireEvent.click(screen.getByRole("button", { name: /Submit Portfolio/i }));

    const expectedPayload = {
      phone: "222",
      skills: "React Native",
      workExperience: "3 years",
      education: "College",
      portId: 10,
    };

    expect(mockUpdPortfolio).toHaveBeenCalledTimes(2);

    // проверим, что dispatch вызывался с экшеном
    expect(mockUpdPortfolio).toHaveBeenCalledWith(expectedPayload);

    // dispatch должен получить то, что вернул updPortfolio-mock (а не undefined)
    const dispatchedValues = mockDispatch.mock.calls.map((c) => c[0]);
    expect(dispatchedValues).toContainEqual(mockUpdPortfolio.mock.results[0].value);
  });

  test("обновляет инпуты, когда portfolio в store изменился", () => {
    const { rerender } = render(<Portfolio />);

    mockState = {
      portfolio: {
        portfolio: {
          portfolioId: 99,
          phone: "555",
          skills: "Go, Docker",
          workExperience: "10 years",
          education: "PhD",
        },
        error: null,
        statusPort: "succeeded",
      },
    };

    rerender(<Portfolio />);

    const { phone, skills, experience, education } = getControls();
    expect(phone).toHaveValue("555");
    expect(skills).toHaveValue("Go, Docker");
    expect(experience).toHaveValue("10 years");
    expect(education).toHaveValue("PhD");
  });
});
