import styled from "@emotion/styled"
import React, { InputHTMLAttributes } from "react"
import { AiOutlineSearch } from "react-icons/ai"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <div className="top">Search</div>
      <div className="field">
        <input
          type="text"
          placeholder="Search Keyword..."
          {...props}
          suppressHydrationWarning
        />
        <AiOutlineSearch aria-hidden="true" />
      </div>
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 1rem;
  }
  > .top {
    padding: 0 0.25rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    letter-spacing: 0;
  }
  > .field {
    position: relative;
    display: flex;
    align-items: center;

    svg {
      position: absolute;
      right: 0.875rem;
      width: 1rem;
      height: 1rem;
      color: ${({ theme }) => theme.colors.gray10};
      pointer-events: none;
    }
  }
  > .field > input {
    padding: 0.625rem 0.875rem;
    padding-right: 2.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    border-radius: 8px;
    outline-style: none;
    width: 100%;
    color: ${({ theme }) => theme.colors.gray12};
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "rgba(255, 255, 255, 0.72)" : theme.colors.gray4};

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray10};
    }

    :focus {
      border-color: ${({ theme }) => theme.colors.gray8};
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "white" : theme.colors.gray5};
    }
  }
`
