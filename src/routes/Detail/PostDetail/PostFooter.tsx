import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"

type Props = {}

const Footer: React.FC<Props> = () => {
  const [showTopButton, setShowTopButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 480)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <StyledWrapper>
      <button
        className="top-button"
        data-visible={showTopButton}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        ↑ Top
      </button>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  font-weight: 500;
  .top-button {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 30;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 9999px;
    padding: 0.625rem 0.875rem;
    color: ${({ theme }) => theme.colors.gray11};
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(0.75rem);
    transition: opacity 180ms ease, transform 180ms ease, color 180ms ease,
      background-color 180ms ease;
    cursor: pointer;

    &[data-visible="true"] {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray5};
    }
  }
`
