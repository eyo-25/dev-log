import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import { zIndexes } from "src/styles/zIndexes"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  return (
    <StyledWrapper>
      <div data-full-width={fullWidth} className="container">
        <Logo />
        <div className="nav">
          <ThemeToggle />
          <NavBar />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Header

const StyledWrapper = styled.div`
  z-index: ${zIndexes.header};
  position: sticky;
  top: 0;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.scheme === "light" ? "rgba(0, 0, 0, 0.08)" : theme.colors.gray5};
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "rgba(255, 255, 255, 0.72)" : "rgba(22, 22, 23, 0.72)"};
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);

  .container {
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    height: 44px;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.gray12};
    font-size: 12px;
    font-weight: 400;
    line-height: 1;

    &[data-full-width="true"] {
      @media (min-width: 768px) {
        padding-left: 6rem;
        padding-right: 6rem;
      }
    }

    .nav {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
  }
`
