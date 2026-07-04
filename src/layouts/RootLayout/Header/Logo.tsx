import Link from "next/link"
import styled from "@emotion/styled"
import Image from "next/image"

const Logo = () => {
  return (
    <StyledWrapper href="/Post" aria-label="A-Yo! Dev'sLog">
      <span className="image">
        <Image
          src="/logo.png"
          width={42}
          height={42}
          alt=""
          priority
        />
      </span>
      <span className="text">A-Yo! Dev&apos;sLog</span>
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;

  flex-shrink: 0;

  color: ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray10 : theme.colors.gray12};
  line-height: 1;

  .image {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .text {
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
  }

  :hover {
    color: ${({ theme }) => theme.colors.gray11};
  }
`
