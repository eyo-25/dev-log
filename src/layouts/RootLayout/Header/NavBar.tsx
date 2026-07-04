import styled from "@emotion/styled"
import Link from "next/link"
import { useRouter } from "next/router"

const menuItems = ["Profile", "Posts", "Portfolio", "Study"]

const NavBar: React.FC = () => {
  const router = useRouter()
  const isPostActive = router.pathname === "/Post" || router.pathname === "/Post/[slug]"

  return (
    <StyledWrapper>
      {menuItems.map((menu) =>
        menu === "Posts" ? (
          <Link
            key={menu}
            href="/Post"
            className="nav-item"
            data-active={isPostActive}
          >
            {menu}
          </Link>
        ) : (
          <button key={menu} type="button" className="nav-item" disabled>
            {menu}
          </button>
        )
      )}
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  flex-shrink: 0;

  .nav-item {
    position: relative;

    display: flex;
    align-items: center;

    height: 100%;
    padding: 0 12px;

    border: 0;
    background: transparent;

    color: ${({ theme }) =>
      theme.scheme === "light" ? theme.colors.gray9 : theme.colors.gray10};
    font-size: 18px;
    font-weight: 400;
    line-height: 1;

    cursor: pointer;
    transition: color 0.2s ease;
  }

  .nav-item[data-active="true"] {
    color: ${({ theme }) =>
      theme.scheme === "light" ? theme.colors.gray10 : theme.colors.gray12};
  }

  .nav-item[data-active="true"]::after {
    content: "";
    position: absolute;

    left: 8px;
    right: 8px;
    bottom: 0;

    height: 1px;
    background: ${({ theme }) =>
      theme.scheme === "light" ? theme.colors.gray10 : theme.colors.gray12};
  }

  .nav-item:not(:disabled):hover {
    color: ${({ theme }) =>
      theme.scheme === "light" ? theme.colors.gray10 : theme.colors.gray12};
  }

  .nav-item:disabled {
    cursor: default;
  }

  .menu-button {
    width: 38px;
    height: 48px;
    margin-left: 2px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;

    border: 0;
    background: transparent;

    cursor: default;
  }

  .menu-button span {
    width: 27px;
    height: 2px;
    background: ${({ theme }) =>
      theme.scheme === "light" ? theme.colors.gray9 : theme.colors.gray10};
  }

  @media (max-width: 767px) {
    .nav-item {
      display: none;
    }
  }
`
